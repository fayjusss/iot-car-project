import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import { Typography, Link } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}))

const Footer = props => {
  const { className, ...rest } = props

  const classes = useStyles()

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography variant="caption">
        &copy;{' '}
        <Link component="a" href="oamk.fi" target="_blank">
          OAMK
        </Link>
        . 2019
      </Typography>
      <Typography variant="caption">
        Created as a study project for OAMK.FI course on Internet of Things
      </Typography>
    </div>
  )
}

Footer.propTypes = {
  className: PropTypes.string
}

export default Footer
