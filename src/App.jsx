import React from 'react';

import Titles from './components/Titles';
import Form from './components/Form';
import Settings from './components/Settings';
import Data from './components/Data';
import Footer from './components/Footer';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { PrayTimes } from './PrayTimes';

require('dotenv').config();

// TODO: check input such as "canada"
// TODO: write single pray times function

// MapQuest API key
const MQ_API_KEY = process.env.REACT_APP_MQ_API_KEY;

class App extends React.Component {
  constructor(props) {
    // checks if user altered settings before, returns null otherwise
    const localMethod = localStorage.getItem('method');
    const localJuristicMethod = localStorage.getItem('juristicMethod');

    // sets initial states to undefined
    super(props);
    this.state = {
      // location
      latitude: undefined,
      longitude: undefined,
      location: undefined,

      // prayers
      fajr: undefined,
      sunrise: undefined,
      dhuhr: undefined,
      asr: undefined,
      maghrib: undefined,
      isha: undefined,

      // settings
      settings: {
        method: localMethod ? localMethod : 'ISNA',
        juristicMethod: localJuristicMethod ? localJuristicMethod : 'Standard',
      },

      error: undefined,
    };

    // checks if location access previously granted
    if (this.checkAuthorizedGeoLocation) {
      navigator.geolocation.getCurrentPosition(this.locationSuccess);
    }
  }

  // get user location when button clicked
  getLocation = async e => {
    e.preventDefault();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.locationSuccess);
    } else {
      console.log('Geo Location not supported by browser');
    }
  };

  checkAuthorizedGeoLocation() {
    if (
      typeof localStorage['authorizedGeoLocation'] === 'undefined' ||
      localStorage['authorizedGeoLocation'] === '0'
    ) {
      return false;
    } else {
      localStorage.setItem('authorizedGeoLocation', 0);
      return true;
    }
  }

  updateSettings = () => {
    const method = localStorage.getItem('method');
    const juristicMethod = localStorage.getItem('juristicMethod');

    this.setState({
      settings: {
        method: method,
        juristicMethod: juristicMethod,
      },
    }, () => {
      const prayerData = this.calculatePrayerTimes(this.state.latitude, this.state.longitude);
      this.setPrayerTimes(this.state.location, prayerData);
    });
  };

  locationSuccess = async position => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let latlon = lat + ',' + lon;

    // remembers location access grant
    localStorage.setItem('authorizedGeoLocation', 1);

    this.setState({
      latitude: lat,
      longitude: lon,
    });

    // calculate prayer times
    const prayerData = this.calculatePrayerTimes(lat, lon);

    const reverse_geocoding_api_call = await fetch(
      `https://www.mapquestapi.com/geocoding/v1/reverse?key=${MQ_API_KEY}&location=${latlon}`,
    ).then();

    const reverse_locationData = await reverse_geocoding_api_call.json();

    let cityName = reverse_locationData.results[0].locations[0].adminArea5;
    let stateName = reverse_locationData.results[0].locations[0].adminArea3;

    let locationText = cityName + ', ' + stateName;

    this.setPrayerTimes(locationText, prayerData);
  };

  locationFailure = err => {
    this.setState({ error: err.message });
  };

  // function that runs when search button clicked
  getData = async e => {
    e.preventDefault();
    const location = e.target.elements.location.value;

    // mapQuest geocoding get coordinates
    const geocoding_api_call = await fetch(
      `https://www.mapquestapi.com/geocoding/v1/address?key=${MQ_API_KEY}&location=${location}`,
    );
    const locationData = await geocoding_api_call.json();

    const lat = locationData.results[0].locations[0].latLng.lat;
    const lon = locationData.results[0].locations[0].latLng.lng;

    const prayerData = this.calculatePrayerTimes(lat, lon);

    const locationText =
      locationData.results[0].locations[0].adminArea5 +
      ', ' +
      locationData.results[0].locations[0].adminArea3;

    // sets state of data, otherwise leaves undefined
    this.setPrayerTimes(locationText, prayerData);
  };

  setPrayerTimes = (locationText, prayerData) => {
    if (locationText) {
      this.setState({
        location: locationText,
        fajr: prayerData.fajr,
        sunrise: prayerData.sunrise,
        dhuhr: prayerData.dhuhr,
        asr: prayerData.asr,
        maghrib: prayerData.maghrib,
        isha: prayerData.isha,
        error: '',
      });
    } else {
      this.setState({
        location: undefined,
        fajr: undefined,
        sunrise: undefined,
        dhuhr: undefined,
        asr: undefined,
        maghrib: undefined,
        isha: undefined,
        error: 'Unable to determine location.',
      });
    }
  };

  // calculate prayer times
  calculatePrayerTimes = (lat, lon) => {
    const prayTimes = new PrayTimes();
    prayTimes.setMethod(this.state.settings.method);
    prayTimes.adjust({ asr: this.state.settings.juristicMethod });

    return prayTimes.getTimes(new Date(), [lat, lon], 'auto', 'auto', '12h');
  };

  render() {
    return (
      <div>
        <Grid
          container
          spacing={0}
          direction='column'
          alignItems='center'
          style={{ minHeight: '96vh' }}
        >
          <Grid item>
            <Paper style={{ background: '#000000', maxWidth: 300 }}>
              <Titles />
              <Form getData={this.getData} getLocation={this.getLocation} />
              <Settings updateSettings={this.updateSettings} />
              <Data
                location={this.state.location}
                fajr={this.state.fajr}
                sunrise={this.state.sunrise}
                dhuhr={this.state.dhuhr}
                asr={this.state.asr}
                maghrib={this.state.maghrib}
                isha={this.state.isha}
                error={this.state.error}
              />
            </Paper>
          </Grid>
        </Grid>
        <Footer />
      </div>
    );
  }
}

export default App;
