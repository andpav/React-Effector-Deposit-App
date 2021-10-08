import { createEffect, attach, createEvent, restore } from '../../lib/effector'

import { $commonApiData } from '../endpoints'
import { api, PostFormData } from '../../transport/api'

export const pureDepositFx = createEffect(api.postForm)

export const depositFx = attach({
  effect: pureDepositFx,
  source: $commonApiData.map(({ submitUrl, headers }) => ({ endpoint: submitUrl, headers })),
  mapParams: (data: PostFormData, { endpoint, headers }) => {
    return { data, endpoint, headers }
  },
})

export const setAmount = createEvent<string>()
export const resetAmount = createEvent()

export const $amount = restore(setAmount, '').reset(resetAmount)
