import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

function ControlBar({ classes }) {
  return (
    <div className={classes.root}>
      <Card className={classes.controlBar}>
        <CardContent>Something</CardContent>
      </Card>
    </div>
  )
}

ControlBar.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  controlBar: PropTypes.object // from enhancer (firestoreConnect + connect)
}

export default ControlBar
