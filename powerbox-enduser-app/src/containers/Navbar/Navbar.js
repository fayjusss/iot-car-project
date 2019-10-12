import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import { DASHBOARD_PATH } from 'constants/paths'
import { AppBar, Toolbar, Hidden, IconButton } from '@material-ui/core'
import BatteryChargingFullIcon from '@material-ui/icons/BatteryChargingFull'
import Avatar from '@material-ui/core/Avatar'
import MenuIcon from '@material-ui/icons/Menu'
import InputIcon from '@material-ui/icons/Input'

function Navbar({
  authExists,
  handleLogout,
  className,
  onSidebarOpen,
  classes,
  ...rest
}) {
  return (
    <AppBar className={(classes.root, className)}>
      <Toolbar>
        <Avatar className={classes.avatar} onClick={handleLogout}>
          <BatteryChargingFullIcon />
        </Avatar>
        <Typography
          variant="h6"
          color="inherit"
          className={classes.flex}
          component={Link}
          to={authExists ? DASHBOARD_PATH : '/'}>
          Powerbox
        </Typography>
        <div className={classes.flexGrow} />
        <IconButton className={classes.signOutButton} color="inherit">
          <InputIcon />
        </IconButton>
        <Hidden mdDown>
          <Hidden lgUp>
            <IconButton color="inherit" onClick={onSidebarOpen}>
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  authExists: PropTypes.bool, // from enhancer (withProps - auth)
  handleLogout: PropTypes.func.isRequired // from enhancer (withHandlers - firebase)
}

export default Navbar
