import React from 'react'
import PropTypes from 'prop-types'

function DashboardPage({ dashboard, classes }) {
  return (
    <div className={classes.container}>
      <span>DashboardPage Component</span>
      <pre>{JSON.stringify(dashboard, null, 2)}</pre>
    </div>
  )
}

DashboardPage.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  dashboard: PropTypes.object // from enhancer (firestoreConnect + connect)
}

export default DashboardPage