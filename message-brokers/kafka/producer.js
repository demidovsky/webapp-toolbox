const { Kafka } = require('kafkajs');

// Create a Kafka client
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

// Create a producer instance
const producer = kafka.producer();

// Connect to Kafka
async function connect() {
  await producer.connect();
}

// Publish a message every second
setInterval(async () => {
  const message = {
    value: 'Hello, Kafka!',
  };
  await producer.send({
    topic: 'my-topic',
    messages: [message],
  });
  console.log(`Published message: ${JSON.stringify(message)}`);
}, 1000);

// Start the producer
connect().catch((error) => console.error(error));
