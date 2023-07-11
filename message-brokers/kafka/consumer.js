const { Kafka } = require('kafkajs');

// Create a Kafka client
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

// Create a consumer instance
const consumer = kafka.consumer({ groupId: 'test-group' });

// Connect to Kafka and subscribe to the topic
async function connect() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'my-topic', fromBeginning: true });
}

// Start consuming messages
async function consume() {
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message from topic '${topic}', partition ${partition}: ${message.value.toString()}`);
    },
  });
}

// Start the consumer
connect().then(consume).catch((error) => console.error(error));
