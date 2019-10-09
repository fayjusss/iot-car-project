import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import defaultUserImageUrl from 'static/Users.png'
import { Avatar, Typography } from '@material-ui/core';

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
}));

const Profile = props => {
  const { avatarUrl, className, ...rest } = props;

  const classes = useStyles();

  const user = {
    name: 'Elon Musk',
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        src={avatarUrl || defaultUserImageUrl}
      />
      <Typography
        className={classes.name}
        variant="subtitle1"
      >
        {user.name}
      </Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
  avatarUrl: PropTypes.string
};

export default Profile;
