const aedes = require('aedes')();
const server = require('net').createServer(aedes.handle);

const port = 1883;

server.listen(port, () => {
    console.log(`Aedes MQTT broker is running on port ${port}`);
});

aedes.on('client', (client) => {
    console.log(`Client connected: ${client ? client.id : 'Unknown'}`);
});

aedes.on('clientDisconnect', (client) => {
    console.log(`Client disconnected: ${client ? client.id : 'Unknown'}`);
});

aedes.on('publish', (packet, client) => {
    console.log(`Message published on topic ${packet.topic}: ${packet.payload.toString()}`);
});
