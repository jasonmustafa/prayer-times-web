import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import LocationIcon from '@material-ui/icons/MyLocation';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import { styles } from '../styles';
import '../css/keyframes.css';

const textfieldTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#ede7f6',
    },
  },
});

function Form(props) {
  const classes = props;

  return (
    <div className='animated delay-04s fadeInDown'>
      <div className={classes.padding15}>
        <form onSubmit={props.getData}>
          <MuiThemeProvider theme={textfieldTheme}>
            <Input
              id='location'
              label='Location'
              type='search'
              placeholder='Location'
              fullWidth
              required={true}
              classes={{
                underline: classes.textfieldUnderline,
              }}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    onClick={props.getLocation}
                    color='primary'
                    aria-label='Location Button'
                  >
                    <LocationIcon fontSize='small' />
                  </IconButton>
                  <IconButton type='submit' color='primary' aria-label='Search Button'>
                    <SearchIcon fontSize='small' />
                  </IconButton>
                </InputAdornment>
              }
            />
          </MuiThemeProvider>
        </form>
      </div>
    </div>
  );
}

Form.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form);
