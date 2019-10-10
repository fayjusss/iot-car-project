import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Divider, Drawer } from '@material-ui/core'
import BarChartIcon from '@material-ui/icons/BarChart'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import EvStationIcon from '@material-ui/icons/EvStation'
import { User, Nav } from './components'

function Sidebar({
  classes,
  open,
  profile,
  variant,
  onClose,
  className,
  ...rest
}) {
  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <BarChartIcon />
    },
    {
      title: 'Powerboxes',
      href: '/powerboxes',
      icon: <EvStationIcon />
    },
    {
      title: 'Account',
      href: '/account',
      icon: <AccountBoxIcon />
    }
  ]

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}>
      <div className={clsx(classes.root, className)}>
        <User profile={profile} />
        <Divider className={classes.divider} />
        <Nav className={classes.nav} pages={pages} />
      </div>
    </Drawer>
  )
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
}

export default Sidebar
