const aedes = require('aedes')();
const net = require('net');

const PORT = process.env.PORT || 1883;

const server = net.createServer(aedes.handle);

server.listen(PORT, function () {
    console.log(`MQTT Broker is running on port ${PORT}`);
});

aedes.on('client', function (client) {
    console.log(`Client connected: ${client.id}`);
});