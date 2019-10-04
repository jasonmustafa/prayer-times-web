import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Logo from '../svgs/clear_night.svg';
import { styles } from '../styles';
import '../css/keyframes.css';

function Titles(props) {
    const { classes } = props;

    return (
        <div>
            <div className="animated fadeInDown">
                <img src={Logo} alt="" className={classes.logo} />
            </div>

            <div className="animated delay-02s fadeInDown">
                <Typography variant="h4" className={classes.title}>
                    Prayer Times
                </Typography>
                <br />
            </div>
        </div>
    );
}

Titles.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Titles);
