import React, { useState, useEffect } from 'react';
import { Container, Typography, makeStyles, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '150px'
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    width: '60%'
  },
  textField: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  }
}));

const Signup = ({onRegister, onError, onToggle}) => {
  const classes = useStyles();
  const [values, setValues] = useState({ email: '', password: '', password_confirmation: ''})

  const _handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const _handleRegister = () => {
    fetch("/users/sign_up", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Expose-Headers': '*'
      },
      body: JSON.stringify(values)
    })
    .then(response => {
      if (response.ok) {
        const accessToken = response.headers.get('Access-Token');
        const expireAt = response.headers.get('Expire-At');
        const refreshToken = response.headers.get('Refresh-Token')
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('expireAt', expireAt * 1000);
        localStorage.setItem('refreshToken', refreshToken);
        onRegister();
      } else {
        return response.json()
      }
    })
    .then(json => {
      onError(json.error);
    })
    .catch(error => console.log("error: ", error))
  }

  return (
    <Container className={classes.container}>
      <Typography variant="h2">Sign Up</Typography>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField
          id="outlined-name"
          label="Email"
          className={classes.textField}
          value={values.email}
          onChange={_handleChange('email')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-password"
          label="Password"
          className={classes.textField}
          value={values.password}
          onChange={_handleChange('password')}
          margin="normal"
          variant="outlined"
          type="password"
        />
        <TextField
          id="outlined-password-confirmation"
          label="Password Confirmation"
          className={classes.textField}
          value={values.password_confirmation}
          onChange={_handleChange('password_confirmation')}
          margin="normal"
          variant="outlined"
          type="password"
        />
        <Button variant="contained" className={classes.button} onClick={_handleRegister}>
          Submit
        </Button>
      </form>
      <Button color="primary" className={classes.button} onClick={onToggle}>
        Log In
      </Button>
    </Container>
  )
}

export default Signup;