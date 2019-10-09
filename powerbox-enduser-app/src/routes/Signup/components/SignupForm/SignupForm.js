import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import TextField from 'components/FormTextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import { required, validateEmail } from 'utils/form'

function SignupForm({ pristine, submitting, handleSubmit, classes }) {
  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Field
            autoComplete="fname"
            name="firstName"
            variant="outlined"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
            component={TextField}
            validate={required}
           />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            variant="outlined"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            component={TextField}
            autoComplete="lname"
            validate={required}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email address"
            name="email"
            autoComplete="email"
            component={TextField}
            validate={[required, validateEmail]}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            component={TextField}
            autoComplete="current-password"
            validate={required}
        />
        </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={pristine || submitting}>
          {submitting ? 'Loading' : 'Sign Up'}
          </Button>
    </form>
  )
}

SignupForm.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  pristine: PropTypes.bool.isRequired, // from enhancer (reduxForm)
  submitting: PropTypes.bool.isRequired, // from enhancer (reduxForm)
  handleSubmit: PropTypes.func.isRequired // from enhancer (reduxForm - calls onSubmit)
}

export default SignupForm
