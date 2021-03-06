export default theme => ({
  root: {
    ...theme.flexColumnCenter,
    justifyContent: 'flex-start',
    height: '100%',
    width: '100%',
    fontWeight: 400,
    paddingTop: '1.5rem'
  },
  paper: {
    marginTop: theme.spacing(9),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(0),
    backgroundColor: theme.palette.primary.main
  },
  panel: {
    ...theme.flexColumnCenter,
    justifyContent: 'center',
    padding: '1.25rem'
  },
  orLabel: {
    marginTop: '1rem',
    marginBottom: '.5rem'
  },
  signup: {
    ...theme.flexColumnCenter,
    justifyContent: 'center',
    marginTop: '1rem'
  },
  signupLink: {
    fontSize: '1rem'
  },
  providers: {
    marginTop: '1rem'
  }
})
