import { fork, allSettled } from 'effector/fork'

import { domain } from '../../../lib/effector'
import { fetchPs, $paymentSystems, $psError } from '../index'

import '../init'

jest.mock('../../../transport/api.ts', () => ({
  api: {
    getPsList: () => Promise.reject(),
    postForm: () => Promise.resolve(),
  },
}))

describe('paymentSystems', () => {
  test('fetch ps failure case', async () => {
    const scope = fork(domain)

    const psBeforeFetch = scope.getState($paymentSystems)
    const psErrorBeforeFetch = scope.getState($psError)

    expect(psBeforeFetch).toEqual([])
    expect(psErrorBeforeFetch).toEqual(false)

    await allSettled(fetchPs, { scope, params: undefined })

    const psAfterFetch = scope.getState($paymentSystems)
    const psErrorAfterFetch = scope.getState($psError)

    expect(psAfterFetch).toEqual([])
    expect(psErrorAfterFetch).toEqual(true)
  })
})
