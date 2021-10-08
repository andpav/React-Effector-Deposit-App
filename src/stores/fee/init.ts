import { forward, guard } from '../../lib/effector'

import { setAmount } from '../deposit'
import { setSelectedId } from '../paymentSystems'
import { sendApplicationErrorFx } from '../app'
import { $shouldShowFee, getFee, getFeeFx, debouncedGetFee, resetFee } from './index'

guard({
  source: setAmount.map((amount) => ({ amount })),
  filter: $shouldShowFee,
  target: getFee,
})

forward({
  from: debouncedGetFee,
  to: getFeeFx,
})

forward({
  from: setSelectedId,
  to: resetFee,
})

forward({
  from: getFeeFx.failData,
  to: sendApplicationErrorFx,
})
