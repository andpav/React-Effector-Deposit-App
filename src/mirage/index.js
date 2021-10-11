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
        () => {
          // const payload = JSON.parse(requestBody);

          return {
            data: {
              redirect: {
                url: 'https://example.com/success',
                method: 'GET',
                params: [],
              },
            },
          }
        },
        { timing: 1000 },
      )

      this.post('/send/message', () => ({
        errors: false,
      }))

      this.post('/api/fee', () => ({ data: { fee: { approximateAmount: '5.79', approximatePercent: 4.9 } } }), {
        timing: 200,
      })

      this.passthrough()
    },
  })
