import { forward } from '../../lib/effector'

import { depositFx } from './index'
import { startProcessing } from '../processing'
import { sendApplicationErrorFx } from '../app'

forward({
  from: depositFx.doneData.map(({ redirect: { url } }) => url),
  to: startProcessing,
})

forward({
  from: depositFx.failData,
  to: sendApplicationErrorFx,
})
