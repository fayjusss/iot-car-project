import React from 'react'
import PropTypes from 'prop-types'
import {
  ButtonBase,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core'
import EvStationIcon from '@material-ui/icons/EvStation'

function PowerboxTile({ id, name, location, status, onSelect, classes }) {
  const statusText = () => {
    switch (status) {
      case 'free':
        return 'Reserve'
      case 'reserved':
        return 'Already Reserved'
      case 'inactive':
        return 'Out of Service'
      default:
        return ''
    }
  }
  const statusColorClass = () => {
    switch (status) {
      case 'free':
        return classes.free
      case 'reserved':
        return classes.reserved
      case 'inactive':
        return classes.inactive
      default:
        return ''
    }
  }
  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <EvStationIcon
                size="small"
                className={`${classes.icon} ${statusColorClass()}`}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {location}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ID: {id}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="button"
                  style={{ cursor: 'pointer' }}
                  className={statusColorClass()}
                  onClick={status === 'free' && onSelect}>
                  {statusText()}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
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
