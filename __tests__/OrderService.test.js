const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const OrderService = require('../lib/services/OrderService.js');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn()
  }
}));

describe('03_separation-of-concerns-demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  //OrderService.createOrder
  it('creates a new order in our database and returns it', () => {
    return OrderService
      .createOrder(20)
      .then(res => {
        expect(res).toEqual({ id: 1, quantity: 20 });
      });
  });

  //OrderService.update
  it('updates an order and returns it', async () => {
    await OrderService.createOrder(30);

    return OrderService
      .update(1, 31)
      .then(res => {
        expect(res).toEqual({ id: 1, quantity: 31 });
      });
  });

  //OrderService.delete
  it('deletes an order and returns it', async () => {
    await OrderService.createOrder(151);

    return OrderService
      .delete(1)
      .then(res => {
        expect(res).toEqual({ id: 1, quantity: 151 });
      });
  });

  
});

