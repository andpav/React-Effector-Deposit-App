import { allSettled, fork } from 'effector/fork'
import { domain } from '../../../lib/effector'

import { depositFx } from '../index'
import { api } from '../../../transport/api'
import { defaultEndpoints, defaultApiData } from '../../endpoints'

import '../init'

jest.mock('../../../transport/api.ts', () => ({
  api: {
    getPsList: jest.fn(),
    postForm: jest.fn(),
  },
}))

describe('deposit', () => {
  test('check deposit method api called', async () => {
    const data = {
      id: 'neteller',
      amount: '5',
    }

    const scope = fork(domain)

    await allSettled(depositFx, { scope, params: data })

    const result = {
      data: {
        id: 'neteller',
        amount: '5',
      },
      endpoint: `${defaultEndpoints.submitUrl}`,
      headers: defaultApiData.headers,
    }

    expect(api.postForm).toBeCalledWith(result)
  })
})
