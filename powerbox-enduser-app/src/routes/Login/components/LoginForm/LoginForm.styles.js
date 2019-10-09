export default theme => ({
  root: {
    ...theme.flexColumnCenter,
    justifyContent: 'flex-start',
    height: '100%',
    width: '400px',
    margin: '.2rem',
    fontSize: '1.2rem'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    width: '100%',
    margin: theme.spacing(3, 0, 2),
  }
})
