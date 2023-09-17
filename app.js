const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });

let leftScore = 0;
let rightScore = 0;

wss.on('connection', (ws) => {
    console.log('WebSocket connection established.');

    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);

        // Process WebSocket messages here
        if (message === 'IncrementLeft') {
            leftScore++;
        } else if (message === 'DecrementLeft') {
            leftScore--;
        } else if (message === 'IncrementRight') {
            rightScore++;
        } else if (message === 'DecrementRight') {
            rightScore--;
        }

        // Send updated scores to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ leftScore, rightScore }));
            }
        });
    });

    // Send initial scores to the newly connected client
    ws.send(JSON.stringify({ leftScore, rightScore }));
});
