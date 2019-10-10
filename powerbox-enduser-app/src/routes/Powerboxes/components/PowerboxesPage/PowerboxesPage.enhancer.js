import { compose } from 'redux'
import { connect } from 'react-redux'
import { withHandlers, setDisplayName } from 'recompose'
import { withRouter } from 'react-router-dom'
import firestoreConnect from 'react-redux-firebase/lib/firestoreConnect'
import { withStyles } from '@material-ui/core/styles'
import { withNotifications } from 'modules/notification'
import { spinnerWhileLoading } from 'utils/components'
import { UserIsAuthenticated } from 'utils/router'
import { POWERBOXES_PATH } from 'constants/paths'
import styles from './PowerboxesPage.styles'

export default compose(
  // Set component display name (more clear in dev/error tools)
  setDisplayName('EnhancedPowerboxesPage'),
  // redirect to /login if user is not logged in
  UserIsAuthenticated,
  // create listener for powerboxes, results go into redux
  firestoreConnect([{ collection: 'powerboxes' }]),
  // map redux state to props
  connect(({ firestore: { ordered } }) => ({
    powerboxes: ordered.powerboxes
  })),
  // Show loading spinner while projects and collabProjects are loading
  spinnerWhileLoading(['powerboxes']),
  // Add props.router
  withRouter,
  // Add props.showError and props.showSuccess
  withNotifications,
  // Add handlers as props
  withHandlers({
    goToPowerbox: ({ history }) => powerboxId => {
      history.push(`${POWERBOXES_PATH}/${powerboxId}`)
    }
  }),
  withStyles(styles)
)
