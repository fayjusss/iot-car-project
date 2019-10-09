import { Loadable } from 'utils/components'

export default {
  path: ':powerboxId',
  component: Loadable({
    loader: () =>
      import(/* webpackChunkName: 'Powerbox' */ './components/PowerboxPage')
  })
}
