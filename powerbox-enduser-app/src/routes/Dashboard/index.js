import { Loadable } from 'utils/components'
import { DASHBOARD_PATH as path } from 'constants/paths'

export default {
  path,
  component: Loadable({
    loader: () =>
      import(/* webpackChunkName: 'Dashboard' */ './components/DashboardPage')
  })
}
