const pool = require('../lib/utils/pool');
// const twilio = require('../lib/utils/twilio.js');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn()
  }
}));

describe('03_separation-of-concerns-demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new order in our database and sends a text message', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then(res => {
        // expect(createMessage).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '1',
          quantity: 10
        });
      });
  });

  it('responds with an array of orders via GET', async () => {
    await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 });

    return request(app)
      .get('/api/v1/orders/')
      .then(res => {
        expect(res.body).toEqual(expect.arrayContaining([{
          id: '1',
          quantity: 10
        }]));
      });
  });

  it('GETs an order by id', async () => {
    await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 });

    return request(app)
      .get('/api/v1/orders/1')
      .then(res => {
        expect(res.body).toEqual({
          id: '1',
          quantity: 10
        });
      });
  });

  it('returns an updated (patched) order by id', async () => {
    await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 });

    await request(app)
      .patch('/api/v1/orders/1')
      .send({ quantity: 50 });

    return request(app)
      .get('/api/v1/orders/1')
      .then(res => {
        expect(res.body).toEqual({
          id: '1',
          quantity: 50
        });
      });
  });

  it('deletes an order by id and sends 204', async () => {
    await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 });


    return request(app)
      .delete('/api/v1/orders/1')
      .then(res => {
        expect(res.statusCode).toEqual(204);
      });
  });


  
});

