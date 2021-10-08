import { debounce } from 'patronum/debounce'
import { createEffect, attach, createEvent, restore, combine } from '../../lib/effector'

import { $commonApiData } from '../endpoints'
import { $amount } from '../deposit'
import { $paymentSystemsSelectedId, $paymentSystemSelected } from '../paymentSystems'

import { api } from '../../transport/api'

export type Fee = { fee: { approximateAmount: string; approximatePercent: number; feeSubunit: number } }

export const getFee = createEvent<{ amount: string }>()

export const debouncedGetFee = debounce({ source: getFee, timeout: 500 })

const fetchFeeFx = createEffect(api.fetchFee)

const $getFeeParams = combine(
  $commonApiData.map(({ fetchFeeUrl, headers }) => ({ endpoint: fetchFeeUrl, headers })),
  $paymentSystemsSelectedId,
)

export const getFeeFx = attach({
  effect: fetchFeeFx,
  source: $getFeeParams,
  mapParams: ({ amount }: { amount: string }, [{ endpoint, headers }, selectedId]) => ({
    data: { amount, id: selectedId },
    endpoint,
    headers,
  }),
})

export const $feePending = getFeeFx.pending

export const resetFee = createEvent()

export const $fee = restore(
  getFeeFx.doneData.map(({ fee: { approximateAmount, approximatePercent } }) => ({
    approximateAmount,
    approximatePercent,
    feeSubunit: approximateAmount.split('.')[1] ? approximateAmount.split('.')[1].length : 0,
  })),
  { approximateAmount: '', approximatePercent: 0, feeSubunit: 0 },
).reset(resetFee)

export const $result = combine($amount, $fee, (amount, { approximateAmount, feeSubunit }) => {
  const difference = (Number(amount) - Number(approximateAmount)).toFixed(feeSubunit)

  return String(difference)
})

const checkIsAmountCorrect = ({ ps, amount }: { ps?: any; amount: string }) => { // TODO: !!!
  if (!ps) return false

  const { min, max } = ps

  return Number(min) <= Number(amount) && Number(amount) <= Number(max)
}

export const $shouldShowFee = combine($paymentSystemSelected, $amount, (ps, amount) =>
  checkIsAmountCorrect({ ps, amount }),
)
