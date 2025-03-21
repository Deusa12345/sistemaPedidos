// src/routes/pedidoRoutes.js

const express = require('express');
const router = express.Router();
const PedidoController = require('../controllers/pedidoController');
const axios = require('axios');
const Joi = require('joi');

// Função para enviar pedido ao WSO2
async function enviarPedido(pedido) {
    try {
        const response = await axios.post('http://localhost:8280/pedidos', pedido);
        console.log('Resposta do WSO2:', response.data);
    } catch (error) {
        console.error('Erro ao enviar pedido para o WSO2:', error);
    }
}

// Definição do schema para validação de pedidos
const pedidoSchema = Joi.object({
    empresa_id: Joi.number().required(),
    tipo: Joi.string().required(),
    descricao: Joi.string().required(),
    valor: Joi.number().positive().required(),
    data_submissao: Joi.date().iso().required()
});

const updatePedidoSchema = Joi.object({
    estado: Joi.string().valid('APROVADO', 'REJEITADO').required()
});

/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Lista todos os pedidos.
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   empresa_id:
 *                     type: integer
 *                   tipo:
 *                     type: string
 *                   descricao:
 *                     type: string
 *                   valor:
 *                     type: number
 *                   data_submissao:
 *                     type: string
 *                     format: date
 *                   estado:
 *                     type: string
 *       500:
 *         description: Erro ao listar pedidos.
 */
router.get('/', PedidoController.getAll);
router.get('/', async (req, res) => {
    try {
        const pedidos = await PedidoController.getAll();
        res.status(200).json(pedidos);
    } catch (error) {
        console.error('Erro ao listar pedidos:', error);
        res.status(500).send('Erro ao listar pedidos.');
    }
});

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Cria um novo pedido.
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               empresa_id:
 *                 type: integer
 *               tipo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               valor:
 *                 type: number
 *               data_submissao:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 empresa_id:
 *                   type: integer
 *                 tipo:
 *                   type: string
 *                 descricao:
 *                   type: string
 *                 valor:
 *                   type: number
 *                 data_submissao:
 *                   type: string
 *                   format: date
 *                 estado:
 *                   type: string
 *       500:
 *         description: Erro ao criar pedido.
 */
router.post('/', async (req, res, next) => {
    const { error } = pedidoSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}, async (req, res) => {
    try {
        const pedidoCriado = await PedidoController.create(req, res);
        if (pedidoCriado) {
            await enviarPedido(req.body);
            res.status(201).json(pedidoCriado);
        }
    } catch (error) {
        console.error('Erro ao criar pedido:', error);
        res.status(500).send('Erro ao criar pedido.');
    }
});

/**
 * @swagger
 * /pedidos/{id}/status:
 *   put:
 *     summary: Atualiza o status de um pedido.
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do pedido.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Status do pedido atualizado com sucesso.
 *       500:
 *         description: Erro ao atualizar o status do pedido.
 */
router.put('/:id/status', async (req, res, next) => {
    const { error } = updatePedidoSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}, async (req, res) => {
    try {
        const pedidoId = req.params.id;
        const pedido = await PedidoController.getById(pedidoId);
        if (!pedido) {
            return res.status(404).json({ error: 'Pedido não encontrado.' });
        }
        const estado = req.body.estado;
        await PedidoController.updateStatus(pedidoId, estado);
        res.status(200).json({ mensagem: `Pedido ${estado.toLowerCase()} com sucesso.` });
    } catch (error) {
        console.error('Erro ao atualizar status do pedido:', error);
        res.status(500).send('Erro ao atualizar status do pedido.');
    }
});

/**
 * @swagger
 * /validar-externo-simulado:
 *   post:
 *     summary: Simula a validação externa de um pedido.
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Validação simulada com sucesso.
 *       400:
 *         description: Pedido inválido.
 */
router.post('/validar-externo-simulado', (req, res) => {
    const valido = Math.random() < 0.8; // 80% de chance de ser válido
    res.json({ valido });
});

/**
 * @swagger
 * /aprovar-manual:
 *   post:
 *     summary: Aprova um pedido manualmente.
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Pedido aprovado manualmente.
 */
router.post('/aprovar-manual', PedidoController.aprovarManual);

/**
 * @swagger
 * /aprovar-automatico:
 *   post:
 *     summary: Aprova um pedido automaticamente.
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Pedido aprovado automaticamente.
 */
router.post('/aprovar-automatico', PedidoController.aprovarAutomatico);

/**
 * @swagger
 * /rejeitar-pedido:
 *   post:
 *     summary: Rejeita um pedido.
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Pedido rejeitado.
 */
router.post('/rejeitar-pedido', (req, res) => {
    res.json({ mensagem: "Pedido rejeitado." });
});

module.exports = router;