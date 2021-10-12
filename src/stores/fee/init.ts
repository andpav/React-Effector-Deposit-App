import { forward, sample, combine, guard } from '../../lib/effector'

import { $amount, setAmount } from '../deposit'
import { $paymentSystemsSelectedId, setSelectedId } from '../paymentSystems'
import { sendApplicationErrorFx } from '../app'
import { calculateResultFx, debouncedGetFee, getFee, getFeeFx, resetFee, setResult } from './index'

forward({
  from: [setAmount, setSelectedId],
  to: getFee,
})

guard({
  clock: debouncedGetFee,
  source: combine($paymentSystemsSelectedId, $amount, (id, amount) => ({ id, amount })),
  filter: ({ id, amount }) => Boolean(id) && Boolean(amount),
  target: getFeeFx,
})

forward({
  from: setSelectedId,
  to: resetFee,
})

sample({
  clock: getFeeFx.doneData.map(({ fee }) => fee),
  source: $amount,
  fn: (amount, fee) => ({ amount, fee }),
  target: calculateResultFx,
})

forward({
  from: calculateResultFx.doneData,
  to: setResult,
})

forward({
  from: getFeeFx.failData,
  to: sendApplicationErrorFx,
})
