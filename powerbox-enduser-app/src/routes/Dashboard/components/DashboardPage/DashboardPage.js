import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import Budget from '../DashboardPage/DashboardComponents/Budget'
import TotalProfit from '../DashboardPage/DashboardComponents/TotalProfit'
import TotalUsers from '../DashboardPage/DashboardComponents/TotalUsers'
import TaskProgress from '../DashboardPage/DashboardComponents/TaskProgress'

function DashboardPage({ dashboard, classes }) {
  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Budget />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalUsers />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TaskProgress />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalProfit />
        </Grid>
      </Grid>
    </div>
  )
}

DashboardPage.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  dashboard: PropTypes.object // from enhancer (firestoreConnect + connect)
}

export default DashboardPage
