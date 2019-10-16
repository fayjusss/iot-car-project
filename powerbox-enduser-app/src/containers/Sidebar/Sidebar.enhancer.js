import { connect } from 'react-redux'
import {
  withHandlers,
  withProps,
  compose,
  flattenProp,
  setDisplayName
} from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { isEmpty, isLoaded } from 'react-redux-firebase'
import { ACCOUNT_PATH } from 'constants/paths'
import styles from './Sidebar.styles'

export default compose(
  // Set component display name (more clear in dev/error tools)
  setDisplayName('EnhancedSidebar'),
  // Map redux state to props
  connect(({ firebase: { auth, profile } }) => ({
    profile
  })),
  // Add props.router (used in handlers)
  withRouter,
  // Handlers as props
  withHandlers({
    goToAccount: props => () => {
      props.history.push(ACCOUNT_PATH)
    }
  }),
  // Add custom props
  withProps(({ auth, profile }) => ({
    authExists: isLoaded(auth) && !isEmpty(auth)
  })),
  // Flatten profile so that avatarUrl and displayName are props
  flattenProp('profile'),
  // Add styles as classes prop
  withStyles(styles)
)
