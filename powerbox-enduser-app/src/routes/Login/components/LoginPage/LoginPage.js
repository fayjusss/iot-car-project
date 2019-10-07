import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import GoogleButton from 'react-google-button'
import Paper from '@material-ui/core/Paper'
import { SIGNUP_PATH } from 'constants/paths'
import LoginForm from '../LoginForm'
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

function LoginPage({ emailLogin, googleLogin, onSubmitFail, classes }) {
  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Paper className={classes.panel}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <LoginForm onSubmit={emailLogin} onSubmitFail={onSubmitFail} />
        <div className={classes.signup}>
          <Link className={classes.signupLink} to={SIGNUP_PATH}>
          Need an account? Register
          </Link>
        </div> 
        <div className={classes.orLabel}>or</div>
        <div className={classes.providers}>
          <GoogleButton onClick={googleLogin} data-test="google-auth-button" />
        </div>
      </Paper>
    </div>
  </Container>
  )
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  emailLogin: PropTypes.func.isRequired, // from enhancer (withHandlers)
  onSubmitFail: PropTypes.func.isRequired, // from enhancer (withHandlers)
  googleLogin: PropTypes.func.isRequired // from enhancer (withHandlers)
}

export default LoginPage
