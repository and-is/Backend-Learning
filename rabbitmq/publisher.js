const amqp = require("amqplib");

const msg = { number: process.argv[2] };
connect();
async function connect() {
  try {
    const amqpServer =
      "amqps://cacxdsza:tzP8y4i7s3Shw3X30dbNd9ltpPNAFs4A@puffin.rmq2.cloudamqp.com/cacxdsza";
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();
    await channel.assertQueue("jobs");
    await channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
    console.log(`Job sent successfully ${msg.number}`);
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error(error);
  }
}
