import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import MoneyIcon from '@material-ui/icons/Money'

function PowerboxTile({ name, onSelect, classes }) {
  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              onClick={onSelect}
              color="textSecondary"
              gutterBottom
              variant="body2">
              {name}
            </Typography>
            <Typography variant="h5">001</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          <ArrowDownwardIcon className={classes.differenceIcon} />
          <Typography className={classes.differenceValue} variant="body2">
            12%
          </Typography>
          <Typography className={classes.caption} variant="caption">
            Since last month
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}

PowerboxTile.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  name: PropTypes.string,
  onSelect: PropTypes.func.isRequired
}

export default PowerboxTile
