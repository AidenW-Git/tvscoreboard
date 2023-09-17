const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files (e.g., HTML, CSS)
app.use(express.static(__dirname));

// Initialize scores
let leftScore = 0;
let rightScore = 0;

// WebSocket connection handling
wss.on('connection', (ws) => {
    console.log('WebSocket connection established.');

    // Send initial scores to the newly connected client
    ws.send(JSON.stringify({ leftScore, rightScore }));

    // Handle incoming WebSocket messages
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
                console.log('Unknown action:', message);
                break;
        }

        // Broadcast updated scores to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ leftScore, rightScore }));
            }
        });
    });
});

// Start the server
const PORT = process.env.PORT || 3000; // Use the provided port or default to 3000
server.listen(PORT, () => {
    console.log(`WebSocket server is running on port ${PORT}.`);
});
