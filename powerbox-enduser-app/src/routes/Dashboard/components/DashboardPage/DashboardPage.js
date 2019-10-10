import React from 'react'
import PropTypes from 'prop-types'

function DashboardPage({ dashboard }) {
  return (
     <div>Dashboard Content</div>
  )
}

DashboardPage.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  dashboard: PropTypes.object // from enhancer (firestoreConnect + connect)
}

export default DashboardPage
