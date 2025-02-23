const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'test-producer',
    brokers: ['pkc-lgq87/za-central-1.aws.confluent.cloud:9092'],
    ssl: true,
    sasl: {
        mechanism: 'plain', // Sesuai dengan gambar
        username: 'your-username', // Gantilah dengan username Kafka Anda
        password: 'your-password'  // Gantilah dengan password Kafka Anda
    }
});

const producer = kafka.producer();

const sendMessage = async () => {
    await producer.connect();
    console.log("Producer connected");

    await producer.send({
        topic: 'kafka-test', // Sesuai dengan gambar
        messages: [{ key: "test-key", value: "Hello from Node.js!" }],
    });

    console.log("Message sent!");
    await producer.disconnect();
};

sendMessage();
