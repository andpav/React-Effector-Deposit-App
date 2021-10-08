import { forward } from '../../lib/effector'

import { depositFx } from './index'
import { startProcessing } from '../processing'
import { sendApplicationErrorFx } from '../app'

forward({
  from: depositFx.doneData,
  to: startProcessing,
})

forward({
  from: depositFx.failData,
  to: sendApplicationErrorFx,
})
