import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {
    ws.on('message', (message: string) => {
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
        wss.clients.forEach(client => {
            if (client != ws) {
                client.send(`The following has been broadcasted to all connected clients except the sender -> ${message}`);
            } else {
                ws.send(`Your message is received`);
            }
        });
    });
    ws.send('Connected to port 9000');
});

server.listen(process.env.PORT || 9000, () => {
    console.log(`Server started on port 9000`);
});