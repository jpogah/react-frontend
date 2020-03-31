import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  button: {
    marginLeft: 60
  }
}));

export const Login = ({state, handleChange, handleLogin}) => {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      
      <Grid container direction="column" spacing={2} >
        <Grid item xs={4} justify="center">
        <TextField
          required
          id="outlined-required"
          label="UserName"
          name="username"
          value={state.username}
          variant="outlined"
          onChange={handleChange}
        />
        </Grid>
       <Grid item xs={4} justify="center">
        <TextField
          id="outlined-password-input"
          label="Password"
          name="password"
          type="password"
          value={state.password}
          autoComplete="current-password"
          variant="outlined"
          onChange={handleChange}
        /> 
        </Grid> 

        <Grid item xs={2} justify="center">
          <Button variant="contained" className={classes.button} color="primary" onClick={handleLogin}>Login</Button>
          </Grid>  
      </Grid>
    </form>
  );
}
