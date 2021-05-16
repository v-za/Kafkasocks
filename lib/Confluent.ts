// console.log('hello world');

 const { Kafka } = require('kafkajs');
// const Kafka = require...

// Confluent class instantiates the connection Confluent Kafka cluster
export class Confluent {
  key: string;
  secret: string;
  server: string;

  // key is the Confluent cloud API key
  // secret is the Confluent Cloud API secret
  // server is the Confluent Cloud URI to connect to the bootstrap server
  constructor(key: string, secret: string, server: string) {
    this.key = key;
    this.secret = secret;
    this.server = server;
  }

  // create will return a Kafka Consumer object

  // TODO:  look into more specific object typing
  //        i.e., in this case we may want to be specific
  //        that the object we are expecting is
  //        an instance of the Confluent Kafka client
  create(client: string) {
    const sasl =
      this.key && this.secret
        ? { username: this.key, password: this.secret, mechanism: "plain" }
        : null;
    const ssl = !!sasl;

    return new Kafka({
      clientId: client,
      brokers: [this.server],
      ssl,
      sasl,
    });
  }
  }

