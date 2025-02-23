const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'test-consumer',
    brokers: ['pkc-lgq87.za-central-1.aws.confluent.cloud:9092'],
    ssl: true,
    sasl: {
        mechanism: 'plain',
        username: 'your-username',
        password: 'your-password'
    }
});

const consumer = kafka.consumer({ groupId: 'web-80753713-99a8-43f8-a6f6-c1eb136c8ab6' });

const receiveMessage = async () => {
    await consumer.connect();
    console.log("Consumer connected");

    await consumer.subscribe({ topic: 'kafka-test', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(`Received: ${message.value.toString()}`);
        },
    });
};

receiveMessage();
