import { Loadable } from 'utils/components'
import { DEVICES_PATH as path } from 'constants/paths'

export default {
  path,
  component: Loadable({
    loader: () =>
      import(/* webpackChunkName: 'Devices' */ './components/DevicesPage')
  })
}
