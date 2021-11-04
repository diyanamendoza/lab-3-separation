const { Router } = require('express');
const Order = require('../models/Order.js');
const OrderService = require('../services/OrderService');

module.exports = Router()
  // if (req.method === 'POST' && req.url === '/api/v1/orders/')
  .post('/', async (req, res, next) => {
    try {
      // req.body === { quantity: 10 }
      // console.log(`post route - ${req.body.quantity}`);
      const order = await OrderService.createOrder(req.body.quantity);
      // order === { id: '1', quantity: 10 }

      res.send(order);
    } catch (err) {
      next(err);
    }
  })

  //get all
  .get('/', async (req, res, next) => {
    try {
      const orders = await Order.getAll();
      res.send(orders);
    } catch (err) {
      next(err);
    }
  })

  //get by id
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await Order.getById(id);
      res.send(order);
    } catch (err) {
      next(err);
    }
  })

  //patch order
  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      // console.log(`patch route - ${req.body.quantity}`);
      const order = await OrderService.update(id, req.body.quantity);
      res.send(order);
    } catch (err) {
      next(err);
    }
  })

//delete order
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      await OrderService.delete(id);
      res.status(204);
      res.send('');
    } catch (err) {
      next(err);
    }
  });

  

