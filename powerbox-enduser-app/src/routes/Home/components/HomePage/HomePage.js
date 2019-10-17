import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  ACCOUNT_PATH,
  DASHBOARD_PATH,
  LOGIN_PATH,
  SIGNUP_PATH
} from 'constants/paths'

const authWrapperUrl = 'https://github.com/mjrussell/redux-auth-wrapper'
const reactRouterUrl = 'https://github.com/ReactTraining/react-router'

function Home({ classes }) {
  return (
    <div className={classes.root}>
      <div className="flex-row-center">
        <h2>Powerbox</h2>
      </div>
      <div className="flex-row-center">
        <div className={classes.section}>
          <h4>Logged Out</h4>
          <ul>
            <li>
              <Link to={DASHBOARD_PATH}>Dashboard</Link>
            </li>
            <li>
              <Link to={ACCOUNT_PATH}>Account</Link>
            </li>
            <li>
              <Link to={LOGIN_PATH}>Login</Link>
            </li>
            <li>
              <Link to={SIGNUP_PATH}>Signup</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

Home.propTypes = {
  classes: PropTypes.object.isRequired // from enhancer (withStyles)
}

export default Home
