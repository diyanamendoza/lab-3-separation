const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {
  static async createOrder(quantity) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${quantity}`
    );

    const order = await Order.insert(quantity);
    // order.id === some string
    // order.quantity === quantity

    return order;
  }

  static async update(id, quantity) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order ${id} updated: Quantity is now ${quantity}`
    );

    const order = await Order.update(id, quantity);
    // order.id === some string
    // order.quantity === quantity

    return order;
  }

  static async delete(id) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order ${id} deleted.`
    );

    const order = await Order.delete(id);
    // order.id === some string
    // order.quantity === quantity

    return order;
  }
};
