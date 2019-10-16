import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

function ControlSwitch({ trigger, updateTrigger }) {
  const [state, setState] = useState({ checked: trigger })

  const handleChange = () => event => {
    setState({ ...state, checked: event.target.checked })
    updateTrigger(state.checked)
  }

  return (
    <FormControlLabel
      control={
        <IOSSwitch
          checked={state.checked}
          onChange={handleChange()}
          value="checked"
        />
      }
    />
  )
}

const IOSSwitch = withStyles(theme => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1)
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none'
      }
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff'
    }
  },
  thumb: {
    width: 24,
    height: 24
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border'])
  },
  checked: {},
  focusVisible: {}
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked
      }}
      {...props}
    />
  )
})

ControlSwitch.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  controlSwitch: PropTypes.object // from enhancer (firestoreConnect + connect)
}

export default ControlSwitch
