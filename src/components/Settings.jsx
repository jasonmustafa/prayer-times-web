import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import FormControl from '@material-ui/core/FormControl';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import { styles } from '../styles';
import '../css/keyframes.css';

const settingsTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#fafafa',
    },
  },
});

function SettingsMenu(props) {
  const localMethod = localStorage.getItem('method');
  const localJuristicMethod = localStorage.getItem('juristicMethod');

  const { onClose, open } = props;

  const [state, setState] = React.useState({
    method: localMethod ? localMethod : 'ISNA',
    juristicMethod: localJuristicMethod ? localJuristicMethod : 'Standard',
  });

  const handleChange = event => {
    setState(oldState => ({
      ...oldState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleClose = (props) => {
    localStorage.setItem('method', state.method);
    localStorage.setItem('juristicMethod', state.juristicMethod);

    onClose();
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby='settings-dialog-title' open={open}>
      <DialogTitle id='settings-dialog-title'>Settings</DialogTitle>
      <DialogContent>
        <form>
          <FormControl>
            <InputLabel htmlFor='calculation-method'>Calculation Method</InputLabel>
            <Select
              value={state.method}
              onChange={handleChange}
              inputProps={{
                name: 'method',
                id: 'method',
              }}
            >
              <MenuItem value={'ISNA'}>ISNA (Islamic Society of North America)</MenuItem>
              <MenuItem value={'MWL'}>MWL (Muslim World League)</MenuItem>
              <MenuItem value={'Egypt'}>Egypt (Egyptian General Authority of Survey)</MenuItem>
              <MenuItem value={'Makkah'}>Makkah (Umm al-Qura University, Makkah)</MenuItem>
              <MenuItem value={'Karachi'}>
                Karachi (University of Islamic Sciences, Karachi)
              </MenuItem>
              <MenuItem value={'Tehran'}>
                Tehran (Institute of Geophysics, University of Tehran)
              </MenuItem>
              <MenuItem value={'Jafari'}>Jafari (Shia Ithna Ashari (Ja`fari))</MenuItem>
            </Select>
          </FormControl>

          <br />
          <br />

          <FormControl>
            <InputLabel htmlFor='juristic-method'>Juristic Method</InputLabel>
            <Select
              value={state.juristicMethod}
              onChange={handleChange}
              inputProps={{
                name: 'juristicMethod',
                id: 'juristic-method',
              }}
            >
              <MenuItem value={'Standard'}>Standard (Hanbali, Maliki, Shafi)</MenuItem>
              <MenuItem value={'Hanafi'}>Hanafi</MenuItem>
            </Select>
          </FormControl>

          <br />
          <br />

        </form>
      </DialogContent>
    </Dialog>
  );
}

SettingsMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

function Settings(props) {
  const { classes } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    props.updateSettings();
  };

  return (
    <div className='animated delay-06s fadeInDown'>
      <div className={classes.settingsIcon}>
        <MuiThemeProvider theme={settingsTheme}>
          <IconButton onClick={handleClickOpen} color='primary' aria-label='Settings Button'>
            <SettingsIcon fontSize='small' />
          </IconButton>
          <SettingsMenu open={open} onClose={handleClose} />
        </MuiThemeProvider>
      </div>
    </div>
  );
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Settings);
