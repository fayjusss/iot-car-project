import React from 'react'
import PropTypes from 'prop-types'
import { Notifications } from 'modules/notification'
import Navbar from 'containers/Navbar'

function CoreLayout({ children, classes }) {
  return (
    <div className={classes.container}>
      <Navbar/>
      <div className={classes.children}>{children}</div>
      <Notifications />
    </div>
  )
}

CoreLayout.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  children: PropTypes.element.isRequired
}

export default CoreLayout
