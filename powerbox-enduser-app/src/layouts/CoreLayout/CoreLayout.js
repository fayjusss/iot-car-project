import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { useTheme } from '@material-ui/styles'
import { useMediaQuery } from '@material-ui/core'
import Navbar from 'containers/Navbar'
import Sidebar from 'containers/Sidebar'
import Footer from 'containers/Footer'

function CoreLayout({ authExists, children, classes }) {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  })
  const [openSidebar, setOpenSidebar] = useState(false)

  const handleSidebarOpen = () => {
    setOpenSidebar(true)
  }

  const handleSidebarClose = () => {
    setOpenSidebar(false)
  }

  const shouldOpenSidebar = isDesktop ? true : openSidebar

  return (
    <div className={classes.container}>
      <div
        className={clsx({
          [classes.root]: true,
          [classes.shiftContent]: isDesktop && authExists
        })}>
        <Navbar onSidebarOpen={handleSidebarOpen} />
        <Sidebar
          onClose={handleSidebarClose}
          open={shouldOpenSidebar}
          variant={isDesktop ? 'persistent' : 'temporary'}></Sidebar>
        )}
        <div className={classes.children}>{children}</div>
        <Footer></Footer>
      </div>
    </div>
  )
}

CoreLayout.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  children: PropTypes.element.isRequired
}

export default CoreLayout
