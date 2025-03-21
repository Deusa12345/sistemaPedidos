// src/models/pedido.js
const pool = require('../database/db');

class Pedido {
  static async getAll() {
    const result = await pool.query('SELECT * FROM PEDIDOS');
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM PEDIDOS WHERE ID = $1', [id]);
    return result.rows[0];
  }

  static async create(pedido) {
    const { empresa_id, tipo, descricao, valor, data_submissao } = pedido;
    const result = await pool.query(
      'INSERT INTO PEDIDOS (Empresa_ID, Tipo, Descricao, Valor, Data_Submissao) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [empresa_id, tipo, descricao, valor, data_submissao]
    );
    return result.rows[0];
  }

  static async updateStatus(id, estado) {
    const result = await pool.query('UPDATE PEDIDOS SET Estado = $1 WHERE ID = $2 RETURNING *', [estado, id]);
    return result.rows[0];
  }
}

module.exports = Pedido;