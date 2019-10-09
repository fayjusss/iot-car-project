import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'

function PowerboxTile({ name, onSelect, classes }) {
  return (
    <Paper className={classes.root}>
      <div className={classes.top}>
        <span className={classes.name} onClick={onSelect}>
          {name || 'No Name'}
        </span>
      </div>
    </Paper>
  )
}

PowerboxTile.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  name: PropTypes.string,
  onSelect: PropTypes.func.isRequired
}

export default PowerboxTile
