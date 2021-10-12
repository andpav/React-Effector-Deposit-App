import { createEvent, createEffect, restore, combine } from '../../lib/effector'

import { api } from '../../transport/api'

export type PaymentSystem = {
  id: string
  fee: string
  currency: string
  label: string
}

export type PaymentSystems = PaymentSystem[]

export const fetchPs = createEvent()
export const resetSelectedPs = createEvent()

export const fetchPsFx = createEffect(api.getPsList)

export const setError = createEvent<boolean>()

export const resetPaymentSystems = createEvent()

export const $paymentSystems = restore(fetchPsFx.doneData, []).reset(resetPaymentSystems)

export const $paymentSystemsPending = fetchPsFx.pending

export const setSelectedId = createEvent<string>()

export const resetPaymentSystemsSelectedId = createEvent()

export const $paymentSystemsSelectedId = restore(setSelectedId, '').reset(resetPaymentSystemsSelectedId)

export const $paymentSystemSelected = combine(
  $paymentSystems,
  $paymentSystemsSelectedId,
  (paymentSystems, selectedId) => paymentSystems.find(({ id }: PaymentSystem) => id === selectedId),
)

export const $currencySelected = $paymentSystemSelected.map(ps => ps?.currency || '')

export const $psError = restore(setError, false)

$psError.reset(fetchPsFx)
