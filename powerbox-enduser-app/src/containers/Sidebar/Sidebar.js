import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx';
import { Divider, Drawer } from '@material-ui/core';
import BarChartIcon from '@material-ui/icons/BarChart';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DevicesIcon from '@material-ui/icons/Devices';
import { User, Nav} from './components';

function Sidebar({
  classes,
  open,
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
      title: 'Devices',
      href: '/settings',
      icon: <DevicesIcon />
    },
    {
      title: 'Account',
      href: '/account',
      icon: <AccountBoxIcon />
    }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        className={clsx(classes.root, className)}
      >
        <User />
        <Divider className={classes.divider} />
        <Nav
          className={classes.nav}
          pages={pages}
        />
      </div>
    </Drawer>
  )
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  displayName: PropTypes.string, // from enhancer (flattenProps - profile)
  avatarUrl: PropTypes.string, // from enhancer (flattenProps - profile)
  authExists: PropTypes.bool, // from enhancer (withProps - auth)
  goToAccount: PropTypes.func.isRequired, // from enhancer (withHandlers - router)
  handleLogout: PropTypes.func.isRequired, // from enhancer (withHandlers - firebase)
  closeAccountMenu: PropTypes.func.isRequired, // from enhancer (withHandlers - firebase)
  handleMenu: PropTypes.func.isRequired, // from enhancer (withHandlers - firebase)
  anchorEl: PropTypes.object, // from enhancer (withStateHandlers - handleMenu)
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
}

export default Sidebar
