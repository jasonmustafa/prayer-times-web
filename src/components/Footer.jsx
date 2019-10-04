import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { styles } from '../styles';
import '../css/keyframes.css';

function Footer(props) {
  const { classes } = props;

  return (
    <div className='animated delay-06s fadeInDown'>
      <a
        href='https://www.jasonmustafa.com/'
        target='_blank'
        rel='noopener noreferrer'
        className={classes.footer}
      >
        <Typography variant='caption' className={classes.footerCreated}>
          Created by{'\u00a0'}
        </Typography>
        <Typography variant='caption' className={classes.footerName}>
          Jason Mustafa
        </Typography>
      </a>
      <br />
    </div>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
