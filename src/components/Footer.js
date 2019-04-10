import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { styles } from '../styles';
import '../css/keyframes.css';

function Footer(props) {
  const { classes } = props;

  return (
    <div className="animated delay-06s fadeInDown">
      <Typography variant="caption" className={classes.footer}>
        Created by Jason Mustafa
      </Typography>
      <br />
    </div>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
