import { createServer, Model } from 'miragejs';
import { ps } from './stubs';

export const configureMirage = () =>
  createServer({
    models: {
      contract: Model,
      transaction: Model,
    },
    routes() {
      this.get('/service/billing/payment-methods/:id', () => ({ data: ps }));

      this.post(
        '/service/billing/payment/:id',
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
          };
        },
        { timing: 1000 },
      );

      this.post('/send/message', () => ({
        errors: false,
      }));

      this.post(
        '/service/billing/fee/:id',
        () => ({ data: { fee: { approximateAmount: '5.79', approximatePercent: 4.9 } } }),
        { timing: 200 },
      );

      this.passthrough();
    },
  });
