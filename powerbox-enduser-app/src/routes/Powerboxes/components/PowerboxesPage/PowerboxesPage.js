import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase/lib/helpers'
import { Route, Switch } from 'react-router-dom'
import PowerboxRoute from 'routes/Powerboxes/routes/Powerbox'
import PowerboxTile from '../PowerboxTile'
import { renderChildren } from 'utils/router'

function PowerboxesPage({
  powerboxes,
  classes,
  match,
  goToPowerbox
}) {
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
            <div className={classes.tiles}>
              {console.log(powerboxes)}
              {!isEmpty(powerboxes) &&
                powerboxes.map((powerbox, ind) => (
                  <PowerboxTile
                    key={`Powerbox-${powerbox.id}-${ind}`}
                    name={powerbox.name}
                    onSelect={() => goToPowerbox(powerbox.id)}
                  />
                ))}
            </div>
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