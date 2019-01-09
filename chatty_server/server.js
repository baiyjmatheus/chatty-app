const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;

const PORT = 3001;

const uuid = require('uuidv4');

// Create new express server
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Broadcast JSON helper
wss.broadcastJSON = (data) => wss.broadcast(JSON.stringify(data));

// Broadcast helper
wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN)
    client.send(data);
  });
}

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Receive message from client
  ws.on('message', (data) => {
    const newMessage = JSON.parse(data);
    newMessage.id = uuid();

    console.log(`${newMessage.username}: said ${newMessage.content}`);
    wss.broadcastJSON(newMessage);
  });

  // Set a callback for when a client closes the socket. This usally means they closed their browser
  ws.on('close', () => console.log('Client disconnected')) ;
});