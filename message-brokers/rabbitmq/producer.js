const amqp = require('amqplib');

async function connect() {
  try {
    const connection = await amqp.connect('amqp://rabbitmq');
    const channel = await connection.createChannel();
    const queue = 'hello';

    await channel.assertQueue(queue, { durable: false });
    setInterval(() => {
      const message = 'Hello, RabbitMQ!';
      channel.sendToQueue(queue, Buffer.from(message));
      console.log(`Sent message: ${message}`);
    }, 1000);
  } catch (error) {
    console.error(error);
  }
}

connect();
