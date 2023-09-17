const WebSocket = require('ws');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Initialize scores
let leftScore = 0;
let rightScore = 0;

app.use(express.static(__dirname)); // Serve static files (e.g., index.html, styles.css)

wss.on('connection', (ws) => {
    console.log('WebSocket connection established.');

    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);

        // Process WebSocket messages here
        switch (message) {
            case 'IncrementLeft':
                leftScore++;
                break;
            case 'DecrementLeft':
                leftScore--;
                break;
            case 'IncrementRight':
                rightScore++;
                break;
            case 'DecrementRight':
                rightScore--;
                break;
            case 'Reset':
                leftScore = 0;
                rightScore = 0;
                break;
            default:
                console.log('Unknown message:', message);
                break;
        }

        // Broadcast updated scores to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ leftScore, rightScore }));
            }
        });
    });

    // Send initial scores to the newly connected client
    ws.send(JSON.stringify({ leftScore, rightScore }));
});

server.listen(3000, () => {
    console.log('WebSocket server is running on port 3000.');
});
