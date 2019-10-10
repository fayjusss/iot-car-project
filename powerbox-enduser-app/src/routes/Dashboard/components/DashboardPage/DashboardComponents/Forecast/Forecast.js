import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import PeopleIcon from '@material-ui/icons/PeopleOutlined'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 70
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.primary.main
  },
  differenceValue: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1)
  }
}))

const Forecast = props => {
  const { className, ...rest } = props
  // eslint-disable-next-line no-unused-vars
  const [forecastData, setForecastData] = useState({})
  const classes = useStyles()

  // GET WEATHER FORECAST FROM API
  const getForecast = async () => {
    const api_call = await fetch(
      `api.openweathermap.org/data/2.5/forecast?q=oulu,fi&APPID=c6cd43a6dc304bb188851d339a3daf48`
    )
    const res = await api_call.json()
    setForecastData(res)
    // eslint-disable-next-line no-console
    console.log(res)
  }

  useEffect(() => {
    getForecast()
  }, [])

  // eslint-disable-next-line no-unused-vars
  const kelvinToCelsius = require('kelvin-to-celsius')

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2">
              TOMORROW:
            </Typography>
            <Typography variant="h5"></Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <PeopleIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          <ArrowUpwardIcon className={classes.differenceIcon} />
          <Typography className={classes.differenceValue} variant="body2">
            16%
          </Typography>
          <Typography className={classes.caption} variant="caption">
            Since last month
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}

Forecast.propTypes = {
  className: PropTypes.string
}

export default Forecast
