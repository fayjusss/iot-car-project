import React from 'react'
import PropTypes from 'prop-types'
import Slider from '@material-ui/core/Slider'
import Card from '@material-ui/core/Card'
import 'date-fns'
import ControlSwitch from 'components/ControlSwitch'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers'

import CardContent from '@material-ui/core/CardContent'
import { Typography, Divider } from '@material-ui/core'
import Button from '@material-ui/core/Button'

function ControlBar({ trigger, updateTrigger, classes, powerbox }) {
  //Function for date and time picker
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  )

  const handleDateChange = date => {
    setSelectedDate(date)
  }

  //Marks for slider
  const marks = [
    {
      value: 40,
      label: '-27°C'
    },
    {
      value: 65,
      label: '-10°C'
    },
    {
      value: 80,
      label: '-5°C'
    },
    {
      value: 95,
      label: '0°C'
    }
  ]

  function valuetext(value) {
    return `${value}°C`
  }

  function valueLabelFormat(value) {
    return marks.findIndex(mark => mark.value === value) + 1
  }

  return (
    <div className={classes.root}>
      <Card className={classes.controlBar}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={9}>
              <Typography type="body1" className="text">
                Turn the powerbox on:
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <ControlSwitch
                trigger={powerbox.trigger}
                updateTrigger={updateTrigger}
              />
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Typography type="body1">
            Set the temperature to trigger powerbox:
          </Typography>
          <Divider className={classes.divider} />
          <Slider
            defaultValue={-20}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-always"
            step={10}
            marks={marks}
          />
          <br></br>
          <Button variant="outlined" color="primary" className={classes.button}>
            Set temperature trigger
          </Button>
          <br></br>
          <br></br>
          <br></br>
          <Typography type="body1">
            Set the date and time to trigger powerbox:
          </Typography>
          <Divider className={classes.divider} />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Choose date"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Choose time"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time'
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <br></br>
          <Button
            variant="outlined"
            color="secondary"
            className={classes.button}>
            Set time and date trigger
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

ControlBar.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  controlBar: PropTypes.object // from enhancer (firestoreConnect + connect)
}

export default ControlBar
