import { createEvent, createEffect, restore, combine } from '../../lib/effector'

import { api } from '../../transport/api'

export const fetchPs = createEvent()
export const resetSelectedPs = createEvent()

export const fetchPsFx = createEffect(api.getPsList)

export const setError = createEvent<boolean>()

export const resetPaymentSystems = createEvent()

export const $paymentSystems = restore(fetchPsFx.doneData, []).reset(resetPaymentSystems)

export const setSelectedId = createEvent<string>()

export const resetPaymentSystemsSelectedId = createEvent()

export const $paymentSystemsSelectedId = restore(setSelectedId, '').reset(resetPaymentSystemsSelectedId)

export const $paymentSystemSelected = combine(
  $paymentSystems,
  $paymentSystemsSelectedId,
  (paymentSystems, selectedId) => paymentSystems.find(({ id }: any) => id === selectedId), // TODO: !!!
)

export const $psError = restore(setError, false)

$psError.reset(fetchPsFx)
