// src/routes/empresaRoutes.js
const express = require('express');
const router = express.Router();
const EmpresaController = require('../controllers/empresaController');

/**
 * @swagger
 * /empresas:
 *   get:
 *     summary: Lista todas as empresas.
 *     responses:
 *       200:
 *         description: Lista de empresas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nome:
 *                     type: string
 *                   nif:
 *                     type: string
 *                   email_contato:
 *                     type: string
 */
router.get('/', EmpresaController.getAll);

/**
 * @swagger
 * /empresas/{id}:
 *   get:
 *     summary: Obtém detalhes de uma empresa.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da empresa.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes da empresa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nome:
 *                   type: string
 *                 nif:
 *                   type: string
 *                 email_contato:
 *                   type: string
 *       404:
 *         description: Empresa não encontrada.
 */
router.get('/:id', EmpresaController.getById);

/**
 * @swagger
 * /empresas:
 *   post:
 *     summary: Cria uma nova empresa.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               nif:
 *                 type: string
 *               email_contato:
 *                 type: string
 *     responses:
 *       201:
 *         description: Empresa criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nome:
 *                   type: string
 *                 nif:
 *                   type: string
 *                 email_contato:
 *                   type: string
 *       500:
 *         description: Erro ao criar empresa.
 */
router.post('/', EmpresaController.create);

module.exports = router;
