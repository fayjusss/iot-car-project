import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: '#ff6600',
    color: theme.palette.primary.contrastText
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 70
  },
  avatar: {
    backgroundColor: '#ffffff',
    color: '#ff6600',
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  }
}))

const TotalProfit = props => {
  const { className, ...rest } = props

  const classes = useStyles()

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="inherit"
              gutterBottom
              variant="body2">
              OCTOBER, 2019
            </Typography>
            <Typography color="#ff6600" variant="h5">
              € 14,7
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          <Typography className={classes.caption} variant="caption">
            Powerbox usage bills for this month.
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}

TotalProfit.propTypes = {
  className: PropTypes.string
}

export default TotalProfit
