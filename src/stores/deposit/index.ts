import { createEffect, attach, createEvent, restore } from '../../lib/effector'

import { api } from '../../transport/api'

export const pureDepositFx = createEffect(api.postForm)

export const depositFx = attach({
  effect: pureDepositFx,
})

export const setAmount = createEvent<string>()
export const resetAmount = createEvent()

export const $amount = restore(setAmount, '').reset(resetAmount)
