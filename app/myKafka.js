const kafka = require("kafka-node")
const JSONStream = require('JSONStream');

const producer_broker_url = process.env.PRODUCER_BROKER
const consumer_broker_url = process.env.CONSUMER_BROKER
console.log("PRODUCER_BROKER: " + producer_broker_url );
console.log("CONSUMER_BROKER: " + consumer_broker_url );

const kafkaClient = new kafka.KafkaClient({
    kafkaHost: producer_broker_url,
    autoConnect: true,
});

const producer = new kafka.Producer(kafkaClient, { partitionerType: 1 })
const consumerGroupStream = new kafka.ConsumerGroupStream({ kafkaHost: consumer_broker_url, groupId: "test-node-group", encoding: "utf8" }, ["first_topic"])

exports.writeToKafka = (message) => {
    let payload = [
        { topic: 'first_topic', messages: message }
    ]

    producer.send(payload, (err, data) => {
        if (err) {console.log(err);return}
        console.log(data);
    })

    producer.on('error', function (err) { console.error(err); })
}

exports.readFromKafka = () => {
    return consumerGroupStream.pipe(JSONStream.stringify())
}