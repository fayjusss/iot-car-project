export default theme => ({
  root: {
    ...theme.flexColumnCenter,
    justifyContent: 'flex-start',
    height: '100%',
    width: '100%',
    fontWeight: 400,
    paddingTop: '4rem'
  },
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  panel: {
    ...theme.flexColumnCenter,
    justifyContent: 'center',
    flexGrow: 1,
    padding: '1.25rem',
    minWidth: '250px',
    minHeight: '270px'
  },
  orLabel: {
    marginTop: '1rem',
    marginBottom: '.5rem'
  },
  login: {
    ...theme.flexColumnCenter,
    justifyContent: 'center',
    marginTop: '1.5rem'
  },
  loginLabel: {
    fontSize: '1rem',
    fontWeight: 'bold'
  },
  loginLink: {
    fontSize: '1rem'
  },
  providers: {
    marginTop: '1rem'
  }
})
