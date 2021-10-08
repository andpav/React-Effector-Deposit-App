import { fork, allSettled } from 'effector/fork'

import { domain } from '../../../lib/effector'
import { fetchPs, $paymentSystems, $psError } from '../index'

import '../init'

const data = [
  {
    id: 'neteller',
    min: 2,
    max: 10,
    label: 'Neteller',
    icon: {
      alt: 'https://cdn4.iconfinder.com/data/icons/online-casinos/512/Neteller-128.png',
      src: 'https://cdn4.iconfinder.com/data/icons/online-casinos/512/Neteller-128.png',
    },
    extraFields: [],
  },
]

jest.mock('../../../transport/api.ts', () => ({
  api: {
    getPsList: () => Promise.resolve(data),
    postForm: () => Promise.resolve(),
  },
}))

describe('paymentSystems', () => {
  test('fetch ps success case', async () => {
    const scope = fork(domain)

    const psBeforeFetch = scope.getState($paymentSystems)
    const psErrorBeforeFetch = scope.getState($psError)

    expect(psBeforeFetch).toEqual([])
    expect(psErrorBeforeFetch).toEqual(false)

    await allSettled(fetchPs, { scope, params: undefined })

    const psAfterFetch = scope.getState($paymentSystems)
    const psErrorAfterFetch = scope.getState($psError)

    expect(psAfterFetch).toEqual(data)
    expect(psErrorAfterFetch).toEqual(false)
  })
})
