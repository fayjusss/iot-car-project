import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import GoogleButton from 'react-google-button'
import Paper from '@material-ui/core/Paper'
import { LOGIN_PATH } from 'constants/paths'
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import PersonIcon from '@material-ui/icons/Person';
import SignupForm from '../SignupForm'
import Typography from '@material-ui/core/Typography';

function SignupPage({ emailSignup, googleLogin, onSubmitFail, classes }) {
  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.root}>
      <Paper className={classes.panel}>
        <Avatar className={classes.avatar}>
          <PersonIcon/>
        </Avatar>
        <Typography component="h1" variant="h6">
          Register
        </Typography>
        <SignupForm onSubmit={emailSignup} onSubmitFail={onSubmitFail} />
        <div className={classes.login}>
        <Link className={classes.loginLink} to={LOGIN_PATH}>
          Already have an account? Login
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

SignupPage.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  emailSignup: PropTypes.func.isRequired, // from enhancer (withHandlers)
  googleLogin: PropTypes.func.isRequired, // from enhancer (withHandlers)
  onSubmitFail: PropTypes.func.isRequired // from enhancer (reduxForm)
}

export default SignupPage
