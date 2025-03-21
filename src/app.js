// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const empresaRoutes = require('./routes/empresaRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const { swaggerUi, specs } = require('./docs/swagger');
const winston = require('winston');

const app = express();

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

app.use(cors());
app.use(bodyParser.json());

app.use('/empresas', empresaRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.url} - ${err.message}`);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

module.exports = app;