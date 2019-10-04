import React from 'react';

import Titles from './components/Titles';
import Form from './components/Form';
import Data from './components/Data';
import Footer from './components/Footer';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { PrayTimes } from './PrayTimes';

require('dotenv').config();

// MapQuest API key
const MQ_API_KEY = process.env.REACT_APP_MQ_API_KEY;

class App extends React.Component {
  constructor(props) {
    // Sets initial states to undefined
    super(props);
    this.state = {
      // Location
      latitude: undefined,
      longitude: undefined,
      location: undefined,

      // Prayers
      fajr: undefined,
      sunrise: undefined,
      dhuhr: undefined,
      asr: undefined,
      maghrib: undefined,
      isha: undefined,

      // Settings

      error: undefined,
    };

    // Checks if location access previously granted
    if (this.checkAuthorizedGeoLocation) {
      navigator.geolocation.getCurrentPosition(this.locationSuccess);
    }
  }

  // Get user location when button clicked
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

  locationSuccess = async position => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let latlon = lat + ',' + lon;

    // Remembers location access grant
    localStorage.setItem('authorizedGeoLocation', 1);

    this.setState({
      latitude: lat,
      longitude: lon,
    });

    // Calculate prayer times
    const PT = new PrayTimes('ISNA');

    const prayerData = PT.getTimes(new Date(), [lat, lon], 'auto', 'auto', '12h');

    const reverse_geocoding_api_call = await fetch(
      `https://www.mapquestapi.com/geocoding/v1/reverse?key=${MQ_API_KEY}&location=${latlon}`,
    ).then();

    const reverse_locationData = await reverse_geocoding_api_call.json();

    let cityName = reverse_locationData.results[0].locations[0].adminArea5;
    let stateName = reverse_locationData.results[0].locations[0].adminArea3;

    this.setState({
      location: cityName + ', ' + stateName,
      fajr: prayerData.fajr,
      sunrise: prayerData.sunrise,
      dhuhr: prayerData.dhuhr,
      asr: prayerData.asr,
      maghrib: prayerData.maghrib,
      isha: prayerData.isha,
      error: '',
    });
  };

  locationFailure = err => {
    this.setState({ error: err.message });
  };

  // Function that runs when search button clicked
  getData = async e => {
    e.preventDefault();
    const location = e.target.elements.location.value;

    // MapQuest geocoding get coordinates
    const geocoding_api_call = await fetch(
      `https://www.mapquestapi.com/geocoding/v1/address?key=${MQ_API_KEY}&location=${location}`,
    );
    const locationData = await geocoding_api_call.json();

    const latitude = locationData.results[0].locations[0].latLng.lat;
    const longitude = locationData.results[0].locations[0].latLng.lng;

    // Calculates prayer times using PrayTimes.js
    // TODO: add toggle for different calculation methods
    const PT = new PrayTimes('ISNA');
    const prayerData = PT.getTimes(new Date(), [latitude, longitude], 'auto', 'auto', '12h');

    // Sets state of data, otherwise leaves undefined
    if (location) {
      this.setState({
        location:
          locationData.results[0].locations[0].adminArea5 +
          ', ' +
          locationData.results[0].locations[0].adminArea3,
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
        error: 'Please enter the value.',
      });
    }
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
