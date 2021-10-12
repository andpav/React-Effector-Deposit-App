import { createEffect, attach, createEvent, restore } from '../../lib/effector'

import { api } from '../../transport/api'
import { $paymentSystemsSelectedId } from '../paymentSystems'

export const pureDepositFx = createEffect(api.postForm)

export const depositFx = attach({
  source: $paymentSystemsSelectedId,
  effect: pureDepositFx,
  mapParams: ({ amount }: { amount: string }, id: string) => ({
    id,
    amount,
  }),
})

export const setAmount = createEvent<string>()
export const resetAmount = createEvent()

export const $amount = restore(setAmount, '').reset(resetAmount)
