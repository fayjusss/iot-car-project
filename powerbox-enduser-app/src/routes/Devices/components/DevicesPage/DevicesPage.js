import React from 'react'
import PropTypes from 'prop-types'

function DevicesPage({ devices, classes }) {
  return (
    <div className={classes.container}>
      <span>DevicesPage Component</span>
      <pre>{JSON.stringify(devices, null, 2)}</pre>
    </div>
  )
}

DevicesPage.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  devices: PropTypes.object // from enhancer (firestoreConnect + connect)
}

export default DevicesPage
