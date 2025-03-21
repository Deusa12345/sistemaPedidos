// src/controllers/empresaController.js
const Empresa = require('../models/empresa');

class EmpresaController {
  static async getAll(req, res) {
    try {
      const empresas = await Empresa.getAll();
      res.json(empresas);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const empresa = await Empresa.getById(req.params.id);
      if (empresa) {
        res.json(empresa);
      } else {
        res.status(404).json({ message: 'Empresa não encontrada' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const empresa = await Empresa.create(req.body);
      res.status(201).json(empresa);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = EmpresaController;