import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { styles } from '../styles';
import '../css/keyframes.css';

import Moonset from '../svgs/wi-moonset.svg';
import Sunrise from '../svgs/wi-sunrise.svg';
import Noon from '../svgs/wi-day-sunny.svg';
import Afternoon from '../svgs/wi-day-haze.svg';
import Sunset from '../svgs/wi-sunset.svg';
import Night from '../svgs/wi-night-clear.svg';

function Data(props) {
  const { classes } = props;

  return (
    <div>
      <div>
        {props.location && (
          <div className="animated fadeInDown">
            <div className="animated fadeInDown">
              {props.location && (
                <Typography variant="caption" className={classes.text}>
                  {props.location}
                </Typography>
              )}
              {props.error && (
                <Typography variant="h6" className={classes.text}>
                  {props.error}
                </Typography>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="animated fadeInDown">
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={4}>
            {props.fajr && (
              <Typography variant="h6" className={classes.textLeft}>
                Fajr
              </Typography>
            )}
          </Grid>
          <Grid item xs={4}>
            {props.fajr && <img src={Moonset} alt="" className={classes.svgFajr} />}
          </Grid>
          <Grid item xs={4}>
            {props.fajr && (
              <Typography variant="h6" className={classes.textRight}>
                {props.fajr}
              </Typography>
            )}
          </Grid>

          <Grid item xs={4}>
            {props.sunrise && (
              <Typography variant="h6" className={classes.textLeft}>
                Sunrise
              </Typography>
            )}
          </Grid>
          <Grid item xs={4}>
            {props.sunrise && <img src={Sunrise} alt="" className={classes.svgSunrise} />}
          </Grid>
          <Grid item xs={4}>
            {props.sunrise && (
              <Typography variant="h6" className={classes.textRight}>
                {props.sunrise}
              </Typography>
            )}
          </Grid>

          <Grid item xs={4}>
            {props.dhuhr && (
              <Typography variant="h6" className={classes.textLeft}>
                Dhuhr
              </Typography>
            )}
          </Grid>
          <Grid item xs={4}>
            {props.dhuhr && <img src={Noon} alt="" className={classes.svgDhuhr} />}
          </Grid>
          <Grid item xs={4}>
            {props.dhuhr && (
              <Typography variant="h6" className={classes.textRight}>
                {props.dhuhr}
              </Typography>
            )}
          </Grid>

          <Grid item xs={4}>
            {props.asr && (
              <Typography variant="h6" className={classes.textLeft}>
                Asr
              </Typography>
            )}
          </Grid>
          <Grid item xs={4}>
            {props.asr && <img src={Afternoon} alt="" className={classes.svgAsr} />}
          </Grid>
          <Grid item xs={4}>
            {props.asr && (
              <Typography variant="h6" className={classes.textRight}>
                {props.asr}
              </Typography>
            )}
          </Grid>

          <Grid item xs={4}>
            {props.maghrib && (
              <Typography variant="h6" className={classes.textLeft}>
                Maghrib
              </Typography>
            )}
          </Grid>
          <Grid item xs={4}>
            {props.maghrib && <img src={Sunset} alt="" className={classes.svgMaghrib} />}
          </Grid>
          <Grid item xs={4}>
            {props.maghrib && (
              <Typography variant="h6" className={classes.textRight}>
                {props.maghrib}
              </Typography>
            )}
          </Grid>

          <Grid item xs={4}>
            {props.isha && (
              <Typography variant="h6" className={classes.textLeft}>
                Isha
              </Typography>
            )}
          </Grid>
          <Grid item xs={4}>
            {props.isha && <img src={Night} alt="" className={classes.svgIsha} />}
          </Grid>
          <Grid item xs={4}>
            {props.isha && (
              <Typography variant="h6" className={classes.textRight}>
                {props.isha}
              </Typography>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

Data.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Data);
