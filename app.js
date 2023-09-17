// ...

// Handle incoming WebSocket messages
wss.on('connection', (ws) => {
    console.log('WebSocket connection established.');

    // Send initial scores to the newly connected client
    ws.send(JSON.stringify({ leftScore, rightScore }));

    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);

        // Process WebSocket messages here
        try {
            const parsedMessage = JSON.parse(message);

            switch (parsedMessage.action) {
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
                    console.log('Unknown action:', parsedMessage.action);
                    break;
            }

            // Broadcast updated scores to all connected clients
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ leftScore, rightScore }));
                }
            });
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });
});

// ...
