import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import ControlBar from 'components/ControlBar'
import { Typography, Divider } from '@material-ui/core'
import Map from '../Map/map'
import Graph from '../Graph/Graph'

function PowerboxPage({ powerbox, updateTrigger, classes }) {
  return (
    <div className={classes.root}>
      <Grid className={classes.root} container spacing={2}>
        <Grid item container direction="column" spacing={2} lg={8} xs={12}>
          <Grid item spacing={2} className={classes.controlSwitch}>
            <Card>
              <CardContent>
                <Typography type="subtitle1">
                  Temperature from the device sensor:
                </Typography>
                <Divider className={classes.divider} />
                <Graph></Graph>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card>
              <CardContent>
                <Typography type="subtitle1">Device location:</Typography>
                <Divider className={classes.divider} />
                <Map
                  lattitude={powerbox.lattitude}
                  longitude={powerbox.longitude}
                  powerbox={powerbox}></Map>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid item lg={4} xs={12}>
          <ControlBar updateTrigger={updateTrigger} powerbox={powerbox} />
        </Grid>
      </Grid>
    </div>
  )
}

PowerboxPage.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  powerbox: PropTypes.object.isRequired, // from enhancer (connect)
  powerboxId: PropTypes.string.isRequired // from enhancer (withProps)
}

export default PowerboxPage
