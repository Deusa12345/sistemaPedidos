// tests/pedidos.test.js
const request = require('supertest');
const app = require('../src/app'); // Importa seu aplicativo

describe('Testes de Integração para Pedidos', () => {
    
    describe('POST /pedidos', () => {
        it('deve criar um novo pedido', async () => {
            const novoPedido = {
                empresa_id: 1,
                tipo: 'Aquisição',
                descricao: 'Compra de PCs',
                valor: 2500,
                data_submissao: '2024-03-02'
            };

            const res = await request(app).post('/pedidos').send(novoPedido);
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('id');
        });
    });

    describe('PUT /pedidos/:id/status', () => {
        it('deve aprovar o pedido automaticamente se o valor for menor que 1000', async () => {
            const res = await request(app).put('/pedidos/1/status').send({ estado: 'APROVADO' });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('mensagem', 'Pedido aprovado automaticamente.');
        });
    });

    // Teste de Integração com WSO2
    describe('Integração com WSO2', () => {
        it('deve enviar o pedido corretamente ao WSO2', async () => {
            const pedidoParaWSO2 = { /* dados do pedido */ };

            const res = await request(app).post('/pedidos/wso2').send(pedidoParaWSO2);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('status', 'enviado');
        });
    });
});
