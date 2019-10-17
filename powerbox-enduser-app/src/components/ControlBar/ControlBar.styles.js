export default theme => ({
  root: {},
  controlBar: {
    height: 600,
    alignItems: 'center',
    justifyContent: 'center'
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  button: {
    margin: theme.spacing(1),
    width: '100%'
  },
  input: {
    display: 'none'
  },
  controlSwitch: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
})
