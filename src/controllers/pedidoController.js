// src/controllers/pedidoController.js
const Pedido = require('../models/pedido');
const { sendMessage } = require('../utils/rabbitmq');

class PedidoController {
    static async getAll(req, res) {
        try {
            const pedidos = await Pedido.getAll();
            res.json(pedidos);
        } catch (err) {
            console.error(`Erro ao obter lista de pedidos: ${err.message}`);
            res.status(500).json({ error: err.message });
        }
    }

    static async getById(req, res) {
        try {
            const pedido = await Pedido.getById(req.params.id);
            if (pedido) {
                res.json(pedido);
            } else {
                res.status(404).json({ message: 'Pedido não encontrado' });
            }
        } catch (err) {
            console.error(`Erro ao obter pedido ${req.params.id}: ${err.message}`);
            res.status(500).json({ error: err.message });
        }
    }

    static async create(req, res) {
        try {
            const pedido = await Pedido.create(req.body);
            res.status(201).json(pedido);

            // Envia o pedido para o RabbitMQ
            await sendMessage('pedidos', pedido);
            console.log(`Pedido ${pedido.id} enviado para a fila RabbitMQ.`);
        } catch (err) {
            console.error(`Erro ao criar pedido: ${err.message}`);
            res.status(500).json({ error: err.message });
        }
    }

    static async updateStatus(req, res) {
        try {
            const pedido = await Pedido.getById(req.params.id);
            if (!pedido) {
                return res.status(404).json({ message: 'Pedido não encontrado' });
            }

            const novoEstado = req.body.estado;

            // Aqui você pode adicionar lógica específica para rejeição se necessário
            if (novoEstado === 'REJEITADO') {
                // Lógica adicional para rejeição, como notificação ou registro
            }

            await Pedido.updateStatus(req.params.id, novoEstado);
            res.json({ message: 'Status do pedido atualizado' });
        } catch (err) {
            console.error(`Erro ao atualizar status do pedido: ${err.message}`);
            res.status(500).json({ error: err.message });
        }
    }

    static async aprovarManual(req, res) {
        const { id, estado } = req.body; // Recebe ID e estado da requisição
        try {
            const pedido = await Pedido.getById(id);
            if (!pedido) {
                return res.status(404).json({ message: 'Pedido não encontrado' });
            }

            await Pedido.updateStatus(id, estado);
            res.json({ mensagem: `Pedido ${estado.toLowerCase()} com sucesso.` });
        } catch (err) {
            console.error(`Erro ao aprovar pedido manualmente: ${err.message}`);
            res.status(500).json({ error: err.message });
        }
    }

    static async aprovarAutomatico(req, res) {
        try {
            // Lógica para aprovação automática
            res.json({ mensagem: 'Pedido aprovado automaticamente.' });
        } catch (err) {
            console.error(`Erro ao aprovar pedido automaticamente: ${err.message}`);
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = PedidoController;

