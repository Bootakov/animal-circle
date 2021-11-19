const { createServer } = require('http');
const WebSocket = require('ws');
const { app, sessionParser } = require('./app');

const PORT = process.env.PORT ?? 3001;

const server = createServer(app);

const wss = new WebSocket.Server({ clientTracking: false, noServer: true });

const map = new Map();

server.on('upgrade', (request, socket, head) => {
    console.log('Parsing session from request...');

    sessionParser(request, {}, () => {
        if (!request.session.userId) {
            socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
            socket.destroy();
            return;
        }

        console.log('Session is parsed!');

        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
        });
    });

    wss.on('connection', (ws, request) => {
        const { userId, userName } = request.session;
        console.log(userName);
        map.set(userId, ws);
        ws.on('message', async (message) => {
            //
            // Here we can now use session parameters.
            //

            const parsed = JSON.parse(message);

            switch (parsed.type) {
                case 'NEW_MESSAGE':
                    console.log('message on back', parsed);
                    // let userId = await User.findOne()
                    map.forEach((client) => {
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(
                                JSON.stringify({
                                    type: parsed.type,
                                    payload: { name: userName, message: parsed.payload },
                                })
                            );
                        }
                    });
                    break;
                case 'CHAT_CONNECT':
                    map.forEach((client) => {
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(
                                JSON.stringify({
                                    type: parsed.type,
                                    payload: userName,
                                })
                            );
                        }
                    });
                    break;

                default:
                    break;
            }
        });

        ws.on('close', () => {
            map.delete(userId);
        });
    });

    server.listen(PORT, () => console.log(`Dobro on port ${PORT}`));

});