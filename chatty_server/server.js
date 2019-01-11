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
  // Set color to ws
  ws.color = generateRandomColor();
  // Send connected users counter to all clients
  const counter = { type: 'counter', counter: wss.clients.size };
  wss.broadcastJSON(counter);
  
  // Receive new message from client and sort by type
  ws.on('message', (data) => {
    const newMessage = JSON.parse(data);
    newMessage.id = uuid();
    newMessage.color = ws.color;
    // add properties according to message type
    switch(newMessage.type) {
      case 'postMessage':
        newMessage.type = 'incomingMessage';
        console.log(`${newMessage.username}: said ${newMessage.content}`);
        break;
      case 'postNotification':
        newMessage.type = 'incomingNotification';
        console.log(newMessage.content);
        break;
      case 'postImage':
        newMessage.type = 'incomingImage';
        console.log(`${newMessage.username}: said ${newMessage.content}`);
        break;
      default:
        throw new Error('Unknown event type ' + newMessage.type);    
    }
    wss.broadcastJSON(newMessage);     
  });

  // Set a callback for when a client closes the socket. This usally means they closed their browser
  ws.on('close', () => {
    // Sends new client count when user disconnects
    const counterObj = {type: 'counter', counter: wss.clients.size};
    wss.broadcastJSON(counterObj);
    console.log('Client disconnected');
  });
});

// Generates a random color
const generateRandomColor = () => {
  const colors = ['#20639b', '#3caea3', '#f6d55c', '#ed55eb'];
  return colors[Math.floor(Math.random() * colors.length)];
}