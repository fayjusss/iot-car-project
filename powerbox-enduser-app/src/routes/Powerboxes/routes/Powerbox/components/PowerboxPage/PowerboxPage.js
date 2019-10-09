import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

function PowerboxPage({ powerbox, powerboxId, classes }) {
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} component="h2">
            {powerbox.name || 'Powerbox'}
          </Typography>
          <Typography className={classes.subtitle}>{powerboxId}</Typography>
          <div style={{ marginTop: '10rem' }}>
            <pre>{JSON.stringify(powerbox, null, 2)}</pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

PowerboxPage.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  powerbox: PropTypes.object.isRequired, // from enhancer (connect)
  powerboxId: PropTypes.string.isRequired // from enhancer (withProps)
}

export default PowerboxPage
