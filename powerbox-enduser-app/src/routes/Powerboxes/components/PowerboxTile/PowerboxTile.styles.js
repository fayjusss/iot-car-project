import { colors } from '@material-ui/core'

export default theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 70
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  free: {
    color: colors.green[600]
  },
  reserved: {
    color: theme.palette.error.main
  },
  inactive: {
    color: colors.grey[600]
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.primary.main
  },
  differenceValue: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1)
  }
})
