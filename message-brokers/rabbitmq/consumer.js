const amqp = require('amqplib');

async function connect() {
  try {
    const connection = await amqp.connect('amqp://rabbitmq');
    const channel = await connection.createChannel();
    const queue = 'hello';

    await channel.assertQueue(queue, { durable: false });
    console.log('Waiting for messages...');

    channel.consume(queue, (message) => {
      console.log(`Received message: ${message.content.toString()}`);
    }, { noAck: true });
  } catch (error) {
    console.error(error);
  }
}

connect();
