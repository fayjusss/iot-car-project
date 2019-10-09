import { Loadable } from 'utils/components'
import { POWERBOXES_PATH as path } from 'constants/paths'

export default {
  path,
  component: Loadable({
    loader: () =>
      import(/* webpackChunkName: 'Powerboxes' */ './components/PowerboxesPage')
  })
}
