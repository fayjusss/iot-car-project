import { connect } from 'react-redux'
import { withProps, compose, setDisplayName } from 'recompose'
import { isEmpty, isLoaded } from 'react-redux-firebase'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import styles from './CoreLayout.styles'

export default compose(
  // Set component display name (more clear in dev/error tools)
  setDisplayName('EnhancedCoreLayout'),
  withRouter,
  // Map redux state to props
  connect(({ firebase: { auth } }) => ({
    auth
  })),
  // Add custom props
  withProps(({ auth }) => ({
    authExists: isLoaded(auth) && !isEmpty(auth)
  })),
  // Add styles as classes prop
  withStyles(styles)
)
