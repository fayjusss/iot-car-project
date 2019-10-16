import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import Weather from '../DashboardPage/DashboardComponents/Weather'
import TotalPrice from '../DashboardPage/DashboardComponents/TotalPrice'
import Forecast from './DashboardComponents/Forecast'
import TaskProgress from './DashboardComponents/ForecastWeek'
import Table from './DashboardComponents/Table'
import { Graph } from './DashboardComponents'

function DashboardPage({ dashboard, classes }) {
  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Weather />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Forecast />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TaskProgress />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalPrice />
        </Grid>
        <Grid item lg={5} md={6} xl={3} xs={12}>
          <Table />
        </Grid>
        <Grid item lg={7} md={12} xl={9} xs={12}>
          <Graph />
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
