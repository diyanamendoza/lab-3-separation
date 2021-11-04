const pool = require('../utils/pool');

module.exports = class Order {
  id;
  quantity;

  constructor(row) {
    this.id = row.id;
    this.quantity = row.quantity;
  }

  static async insert(quantity) {
    const { rows } = await pool.query(
      `INSERT INTO orders (quantity) VALUES ($1) RETURNING *`,
      [quantity]
    );

    return new Order(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `SELECT * from orders`
    );

    return rows;
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * from orders WHERE id = $1`, [id]
    );

    return rows[0];
  }

  static async update(id, quantity) {
    const { rows } = await pool.query(
      `UPDATE orders SET quantity = $1 WHERE id = $2 RETURNING *`, [quantity, id]
    );

    return rows[0];
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE from orders WHERE id = $1 RETURNING *`, [id]
    );

    return rows[0];
  }

};

