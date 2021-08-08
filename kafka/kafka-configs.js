const { Kafka } = require('kafkajs')
 
const kafka = new Kafka({
  clientId: 'chat-service-client',
  brokers: ['localhost:9092']
})

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'test-group' })


module.exports = {
    producer,
    consumer
}
 