const amqp = require("amqplib");

connect();
async function connect() {
  try {
    const amqpServer =
      "amqps://cacxdsza:tzP8y4i7s3Shw3X30dbNd9ltpPNAFs4A@puffin.rmq2.cloudamqp.com/cacxdsza";
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();
    await channel.assertQueue("jobs");

    channel.consume("jobs", (message) => {
      const input = JSON.parse(message.content.toString());
      console.log(`Received job with input ${input.number}`);
      if (input.number == 7) channel.ack(message);
    });
    console.log("Waiting for messages..");
  } catch (error) {
    console.error(error);
  }
}
