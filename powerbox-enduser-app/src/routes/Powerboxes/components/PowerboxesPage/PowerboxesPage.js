import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase/lib/helpers'
import { Route, Switch } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import PowerboxRoute from 'routes/Powerboxes/routes/Powerbox'
import PowerboxTile from '../PowerboxTile'
import { renderChildren } from 'utils/router'

function PowerboxesPage({ powerboxes, classes, match, goToPowerbox }) {
  return (
    <Switch>
      {/* Child routes */}
      {renderChildren([PowerboxRoute], match)}
      {/* Main Route */}
      <Route
        exact
        path={match.path}
        render={() => (
          <div className={classes.root}>
            {!isEmpty(powerboxes) && (
              <Grid container spacing={4}>
                {powerboxes.map((powerbox, ind) => (
                  <Grid item lg={3} sm={6} xl={3} xs={12}>
                    <PowerboxTile
                      key={`Powerbox-${powerbox.id}-${ind}`}
                      name={powerbox.name}
                      onSelect={() => goToPowerbox(powerbox.id)}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </div>
        )}
      />
    </Switch>
  )
}

PowerboxesPage.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  match: PropTypes.object.isRequired, // from enhancer (withRouter)
  powerboxes: PropTypes.array, // from enhancer (connect + firebaseConnect - firebase)
  goToPowerbox: PropTypes.func.isRequired // from enhancer (withHandlers - router)
}

export default PowerboxesPage
