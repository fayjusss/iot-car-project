import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import defaultUserImageUrl from '@material-ui/icons/PermIdentity'
import { Avatar, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: '40px'
  },
  name: {
    marginTop: theme.spacing(1)
  }
}))

const Profile = props => {
  const { profile, className, ...rest } = props

  const classes = useStyles()

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar
        alt="Person"
        className={classes.avatar}
        src={profile.avatarUrl || defaultUserImageUrl}
      />
      <Typography className={classes.name} variant="subtitle1">
        {profile.displayName}
      </Typography>
    </div>
  )
}

Profile.propTypes = {
  className: PropTypes.string,
  avatarUrl: PropTypes.string
}

export default Profile
