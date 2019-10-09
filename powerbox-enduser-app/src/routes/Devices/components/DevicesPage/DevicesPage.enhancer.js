import { compose } from 'redux'
import { connect } from 'react-redux'
import firestoreConnect from 'react-redux-firebase/lib/firestoreConnect'
import { withStyles } from '@material-ui/core/styles'
import styles from './DevicesPage.styles'

export default compose(
  // create listener for devices, results go into redux
  firestoreConnect([{ collection: 'devices' }]),
  // map redux state to props
  connect(({ firestore: { data } }) => ({
    devices: data.devices
  })),
  withStyles(styles)
)
