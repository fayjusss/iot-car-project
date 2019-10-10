import { connect } from 'react-redux'
import { withHandlers, compose, withProps, setDisplayName } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import withFirebase from 'react-redux-firebase/lib/withFirebase'
import { isEmpty, isLoaded } from 'react-redux-firebase/lib/helpers'
import styles from './Navbar.styles'

export default compose(
  // Set component display name (more clear in dev/error tools)
  setDisplayName('EnhancedNavbar'),
  // Map redux state to props
  connect(({ firebase: { auth } }) => ({
    auth
  })),
  // Add props.router (used in handlers)
  withRouter,
  // Add props.firebase (used in handlers)
  withFirebase,
  // Handlers as props
  withHandlers({
    handleLogout: props => () => {
      props.firebase.logout()
      props.history.push('/')
    }
  }),
  // Add custom props
  withProps(({ auth }) => ({
    authExists: isLoaded(auth) && !isEmpty(auth)
  })),
  // Add styles as classes prop
  withStyles(styles)
)
