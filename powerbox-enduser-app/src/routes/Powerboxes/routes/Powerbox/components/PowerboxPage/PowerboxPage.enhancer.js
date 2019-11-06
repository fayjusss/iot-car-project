import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { get } from 'lodash'
import firestoreConnect from 'react-redux-firebase/lib/firestoreConnect'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { withFirestore } from 'react-redux-firebase'
import {
  withHandlers,
  setPropTypes,
  setDisplayName,
  withProps
} from 'recompose'
import { spinnerWhileLoading } from 'utils/components'
import { UserIsAuthenticated } from 'utils/router'
import styles from './PowerboxPage.styles'

export default compose(
  // Set component display name (more clear in dev/error tools)
  setDisplayName('EnhancedPowerboxPage'),
  // Redirect to /login if user is not logged in
  // UserIsAuthenticated,
  // Add props.match
  withRouter,
  // Set proptypes of props used in HOCs
  setPropTypes({
    // From react-router
    match: PropTypes.shape({
      params: PropTypes.shape({
        powerboxId: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }),
  // Map powerboxId from route params (powerboxes/:powerboxId) into props.powerboxId
  withProps(({ match: { params: { powerboxId } } }) => ({
    powerboxId
  })),
  // Create firestore listeners on mount
  firestoreConnect(({ powerboxId }) => [
    // Listener for projects the current user created
    {
      collection: 'powerbox',
      doc: powerboxId
    }
  ]),
  withFirestore,
  // Map projects from redux state to props
  connect(({ firestore: { data } }, { powerboxId }) => ({
    powerbox: get(data, `powerboxes.${powerboxId}`)
  })),
  // Show loading spinner while project is loading
  spinnerWhileLoading(['powerbox']),
  // Add handlers as props
  withHandlers({
    updateTrigger: props => trigger => {
      return props.firestore.update(`powerboxes/${props.powerboxId}`, {
        trigger: !trigger
      })
    }
  }),
  // Add styles as props.classes
  withStyles(styles)
)
