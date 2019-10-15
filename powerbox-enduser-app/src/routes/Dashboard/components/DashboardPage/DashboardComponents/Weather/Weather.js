import React, { useState, useEffect } from 'react'
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
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  }
}))

const Weather = props => {
  const { className, ...rest } = props
  const [weatherData, setWeatherData] = useState({})
  const classes = useStyles()

  //Get weather data from open weather API

  const getWeather = async () => {
    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=oulu,fi&appid=c6cd43a6dc304bb188851d339a3daf48`
    )
    const response = await api_call.json()
    setWeatherData(response)
    // eslint-disable-next-line no-console
    console.log(response)
  }

  useEffect(() => {
    getWeather()
  }, [])

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
              OULU, FINLAND
            </Typography>
            {weatherData.main && (
              <Typography variant="h6">
                {kelvinToCelsius(weatherData.main.temp)}
                {'\u00b0C'}
              </Typography>
            )}
          </Grid>
          <Grid item>
            {weatherData.main && (
              <Avatar className={classes.avatar}>
                <img
                  alt=""
                  src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                />
              </Avatar>
            )}
          </Grid>
        </Grid>
        <div className={classes.difference}>
          {weatherData.main && (
            <Typography className={classes.caption} variant="caption">
              Current weather: {weatherData.weather[0].main}
            </Typography>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

Weather.propTypes = {
  className: PropTypes.string
}

export default Weather
