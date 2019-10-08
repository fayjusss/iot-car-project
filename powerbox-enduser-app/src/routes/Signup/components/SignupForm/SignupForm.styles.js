export default theme => ({
  root: {
    ...theme.flexColumnCenter,
    justifyContent: 'flex-start',
    height: '100%',
    width: '400px',
    margin: '.2rem',
    backgroundColor: theme.palette.common.white,
    fontSize: '1.2rem'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
})
