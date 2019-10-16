import React from 'react'
import PropTypes from 'prop-types'
import Slider from '@material-ui/core/Slider'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { Typography, Divider } from '@material-ui/core'

function ControlBar({ trigger, updateTrigger, classes }) {
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
      value: 85,
      label: '-5°C'
    },
    {
      value: 100,
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
          <Typography type="body1">
            Set the temperature to trigger powerbox:
          </Typography>
          <Divider className={classes.divider} />
          <Slider
            defaultValue={40}
            valueLabelFormat={valueLabelFormat}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-restrict"
            step={null}
            valueLabelDisplay="auto"
            marks={marks}
          />
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
