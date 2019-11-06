import { compose } from 'redux'
import { connect } from 'react-redux'
import firestoreConnect from 'react-redux-firebase/lib/firestoreConnect'
import { UserIsAuthenticated } from 'utils/router'
import { withStyles } from '@material-ui/core/styles'
import styles from './DashboardPage.styles'

export default compose(
  // UserIsAuthenticated,
  // create listener for dashboard, results go into redux
  firestoreConnect([{ collection: 'dashboard' }]),
  // map redux state to props
  connect(({ firestore: { data } }) => ({
    dashboard: data.dashboard
  })),
  withStyles(styles)
)
