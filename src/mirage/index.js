import { createServer, Model } from 'miragejs'
import { ps } from './stubs'

export const configureMirage = () =>
  createServer({
    models: {
      contract: Model,
      transaction: Model,
    },
    routes() {
      this.get('/api/payment-systems', () => ({ data: ps }))

      this.post(
        '/api/create-payment',
        () => ({
          data: {
            redirect: {
              url: 'https://example.com/pending',
              method: 'GET',
              params: [],
            },
          },
        }),
        { timing: 1000 },
      )

      this.post('/send/message', () => ({
        errors: false,
      }))

      this.post(
        '/api/fee',
        (_, request) => {
          const { id: requestId, amount } = JSON.parse(request.requestBody)

          const feePercent = ps.find(({ id }) => id === requestId)?.fee || 0

          return { data: { fee: Math.ceil((amount * feePercent) / 100) } }
        },
        {
          timing: 200,
        },
      )

      this.passthrough()
    },
  })
