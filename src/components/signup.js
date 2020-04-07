import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '50ch',
    },
  },
  button: {
    marginLeft: 10,
    width: '52ch'
  }
}));

export const Signup = ({state, handleChange, handleSignup}) => {
  const classes = useStyles();

  return (
    <>
   <Typography variant='h6' align='center'>Sign Up</Typography>
    <Grid container direction='column' alignItems='center'>
    <form className={classes.root} noValidate autoComplete="off">
      <Grid container direction="column"  justify='center' spacing={2} >
        <Grid item  >
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
        <Grid item  >
        <TextField
          required
          label="Email"
          name="email"
          value={state.email}
          variant="outlined"
          onChange={handleChange}
        />
        </Grid>
       <Grid item xs={4}>
        <TextField
          label="Password"
          name="password"
          type="password"
          value={state.password}
          autoComplete="current-password"
          variant="outlined"
          onChange={handleChange}
        /> 
        </Grid> 

        <Grid item xs={2} >
          <Button variant="contained" className={classes.button} color="primary" onClick={handleSignup}>Create My Account</Button>
          </Grid>  
      </Grid>
    </form>
    </Grid>
    </>
  );
}
