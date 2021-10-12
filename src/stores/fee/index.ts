import { debounce } from 'patronum/debounce'
import { createEffect, attach, createEvent, restore } from '../../lib/effector'

import { api } from '../../transport/api'

export type Fee = { fee: string }

export const getFee = createEvent()

export const debouncedGetFee = debounce({ source: getFee, timeout: 500 })

const fetchFeeFx = createEffect(api.fetchFee)

export const getFeeFx = attach({
  effect: fetchFeeFx,
})

export const $feePending = getFeeFx.pending

export const resetFee = createEvent()

export const $fee = restore(
  getFeeFx.doneData.map(({ fee }) => fee),
  '',
).reset(resetFee)

export const setResult = createEvent<string>()
export const resetResult = createEvent()

export const $result = restore(setResult, '').reset(resetResult)

export const calculateResultFx = createEffect(({ amount, fee }: { amount: string; fee: string }) => {
  const difference = Number(amount) - Number(fee)

  return String(difference)
})
