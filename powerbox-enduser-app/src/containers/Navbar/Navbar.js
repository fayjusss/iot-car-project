import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { DASHBOARD_PATH } from "constants/paths";
import { AppBar, Toolbar, Hidden, IconButton } from "@material-ui/core";
import BatteryChargingFullIcon from "@material-ui/icons/BatteryChargingFull";
import Avatar from "@material-ui/core/Avatar";
import MenuIcon from "@material-ui/icons/Menu";

function Navbar({
  avatarUrl,
  displayName,
  authExists,
  goToAccount,
  handleLogout,
  anchorEl,
  className,
  onSidebarOpen,
  classes,
  ...rest
}) {
  return (
    <AppBar {...rest} className={(classes.root, className)}>
      <Toolbar>
        <Avatar className={classes.avatar}>
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
        <Hidden mdDown>
          <Hidden lgUp>
            <IconButton color="inherit" onClick={onSidebarOpen}>
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  handleDrawerOpen: PropTypes.func,
  displayName: PropTypes.string, // from enhancer (flattenProps - profile)
  avatarUrl: PropTypes.string, // from enhancer (flattenProps - profile)
  authExists: PropTypes.bool, // from enhancer (withProps - auth)
  goToAccount: PropTypes.func.isRequired, // from enhancer (withHandlers - router)
  handleLogout: PropTypes.func.isRequired // from enhancer (withHandlers - firebase)
}

export default Navbar
