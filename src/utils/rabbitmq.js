// src/utils/rabbitmq.js
const amqp = require('amqplib');
require('dotenv').config();

const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://localhost';
let connection;

async function connect() {
    if (!connection) {
        connection = await amqp.connect(rabbitmqUrl);
    }
    return connection;
}

async function sendMessage(queue, message) {
    const channel = await (await connect()).createChannel();
    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    await channel.close();
}

async function consumeMessage(queue, callback) {
    const channel = await (await connect()).createChannel();
    await channel.assertQueue(queue, { durable: false });
    channel.consume(queue, (message) => {
        if (message) {
            callback(JSON.parse(message.content.toString()));
            channel.ack(message);
        }
    });
}

module.exports = { connect, sendMessage, consumeMessage };