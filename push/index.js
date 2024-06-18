const http = require("http");
const WebSocketServer = require("websocket").server;
let connections = []; // all that are connected

// creating raw http server to create the TCP
const httpserver = http.createServer();

// pass httpserver to the websocketserver library to do all the job, to override req/res
const websocket = new WebSocketServer({ httpServer: httpserver });

//listen on the TCP socket
httpserver.listen(8000, () =>
  console.log("My server is listening on port 8000")
);

// web socket request handling
websocket.on("request", (request) => {
  const connection = request.accept(null, request.origin);
  connection.on("message", (message) => {
    connections.forEach((c) =>
      c.connected
        ? c.send(
            `User${connection.socket.remotePort} says: ${message.utf8Data}`
          )
        : null
    );
  });

  connections.push(connection);
  connections.forEach((c) =>
    c.send(`User${connection.socket.remotePort} just connected.`)
  );
});

//let ws = new WebSocket("ws://localhost:8080");
//ws.onmessage = message => console.log(`Received: ${message.data}`);
//ws.send("it's me client")
