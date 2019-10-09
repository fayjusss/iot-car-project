import React,  { useState }  from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx';
import Sidebar from 'containers/Sidebar'
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import Navbar from 'containers/Navbar';


const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    height: '100%'
  }
}));

function DashboardPage({ dashboard }) {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;
  return (
    <div className={clsx({
      [classes.root]: true,
      [classes.shiftContent]: isDesktop
      })}>
      <Navbar onSidebarOpen={handleSidebarOpen} />
      <Sidebar
      onClose={handleSidebarClose}
      open={shouldOpenSidebar}
      variant={isDesktop ? 'persistent' : 'temporary'}
      ></Sidebar>
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
