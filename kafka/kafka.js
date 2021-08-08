
const {
    consumer,
    producer
} = require('./kafka-configs')

const run = async () => {
    // Producing
    await producer.connect()
    await producer.send({
      topic: 'test-topic',
      messages: [
        { value: 'Hello KafkaJS user!' },
      ],
    })
   
    // Consuming
    await consumer.connect()
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
   
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          partition,
          offset: message.offset,
          value: message.value.toString(),
        })
      },
    })
  }
   
  run().catch(console.error)