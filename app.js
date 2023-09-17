const WebSocket = require('ws');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('WebSocket connection established.');

    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        // Process WebSocket messages here
    });
});

server.listen(3000, () => {
    console.log('WebSocket server is running on port 3000.');
});
