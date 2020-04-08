import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Typography, Link } from '@material-ui/core';
import history from './history';

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
  },
 
}));

export const Login = ({state, handleChange, handleLogin}) => {
  const classes = useStyles();

  return (
    <>
   <Typography variant='h6' align='center'>Sign In</Typography>
    <Grid container direction='column' alignItems='center'>
    <form className={classes.root} noValidate autoComplete="off">
      <Grid container direction="column"  justify='center' spacing={2} >
        <Grid item xs={4} >
        <TextField
          required
          label="UserName"
          name="username"
          value={state.username}
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
          <Button variant="contained" className={classes.button} color="primary" onClick={handleLogin}>Login</Button>
          </Grid> 
          
            <Typography>Don't have an account?<Link href='/signup' >Sign Up</Link></Typography>
         
      </Grid>
    </form>
    </Grid>
    </>
  );
}
