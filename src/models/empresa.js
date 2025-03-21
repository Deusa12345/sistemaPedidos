// src/models/empresa.js
const pool = require('../database/db');

class Empresa {
  static async getAll() {
    const result = await pool.query('SELECT * FROM EMPRESAS');
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM EMPRESAS WHERE ID = $1', [id]);
    return result.rows[0];
  }

  static async create(empresa) {
    const { nome, nif, email_contato } = empresa;
    const result = await pool.query(
      'INSERT INTO EMPRESAS (Nome, NIF, Email_Contato) VALUES ($1, $2, $3) RETURNING *',
      [nome, nif, email_contato]
    );
    return result.rows[0];
  }
}

module.exports = Empresa;