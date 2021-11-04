const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const Order = require('../lib/models/Order.js');

describe('03_separation-of-concerns-demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  //Order.insert(quantity)
  it('creates and returns an order', () => {
    return Order
      .insert(10)
      .then(res => {
        expect(res).toEqual({ 'id': 1, quantity: 10 });
      });
  });


  //Order.getAll()
  it('returns an array of orders', async () => {
    await Order.insert(10);
    await Order.insert(25);

    return Order
      .getAll()
      .then(res => {
        expect(res).toEqual(expect.arrayContaining([
          { id: 1, quantity: 10 },
          { id: 2, quantity: 25 }
        ]));
      });
  });

  // Order.getById(id)
  it('returns an order', async () => {
    await Order.insert(30);

    return Order
      .getById(1)
      .then(res => {
        expect(res).toEqual({ id: 1, quantity: 30 });
      });

  });

  // Order.update(id, quantity)
  it('returns the updated order', async () => {
    await Order.insert(50);
    
    return Order
      .update(1, 56)
      .then(res => {
        expect(res).toEqual({ id: 1, quantity: 56 });
      });
  });

  // Order.delete(id)
  it('returns the deleted order', async () => {
    await Order.insert(24);

    return Order
      .delete(1)
      .then(res => {
        expect(res).toEqual({ id: 1, quantity: 24 });
      });

  });

});
