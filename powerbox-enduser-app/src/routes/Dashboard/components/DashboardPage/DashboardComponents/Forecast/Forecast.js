import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core'

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
    backgroundColor: '#99ccff',
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
  const [forecastData, setForecastData] = useState({})
  const classes = useStyles()

  // GET WEATHER FORECAST FROM API
  const getForecast = async () => {
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=oulu,fi&APPID=c6cd43a6dc304bb188851d339a3daf48`
    )
    const res = await api_call.json()
    setForecastData(res)
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
              variant="subtitle1">
              TOMORROW:
            </Typography>
            {forecastData.list && (
              <Typography variant="h6">
                {kelvinToCelsius(forecastData.list[8].main.temp)}
                {'\u00b0C'}
              </Typography>
            )}
          </Grid>
          <Grid item>
            {forecastData.list && (
              <Avatar className={classes.avatar}>
                <img
                  alt=""
                  src={`http://openweathermap.org/img/w/${forecastData.list[8].weather[0].icon}.png`}
                />
              </Avatar>
            )}
          </Grid>
        </Grid>
        <div className={classes.difference}>
          {forecastData.list && (
            <Typography className={classes.caption} variant="caption">
              Forecast for tomorrow: {forecastData.list[8].weather[0].main}
            </Typography>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

Forecast.propTypes = {
  className: PropTypes.string
}

export default Forecast
