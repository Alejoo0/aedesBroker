const aedes = require('aedes')();
const net = require('net');
const ws = require('websocket-stream');

// Carga las variables de entorno
require('dotenv').config();

// Puerto TCP para MQTT
const MQTT_PORT = process.env.MQTT_PORT || 1883;

// Puerto WebSocket (opcional)
const WS_PORT = process.env.WS_PORT || 8080;

// Inicia el servidor TCP
const mqttServer = net.createServer(aedes.handle);
mqttServer.listen(MQTT_PORT, function () {
    console.log(`MQTT Broker running on port ${MQTT_PORT}`);
});

// Inicia el servidor WebSocket (opcional)
const wsServer = require('http').createServer();
ws.createServer({ server: wsServer }, aedes.handle);
wsServer.listen(WS_PORT, function () {
    console.log(`WebSocket running on port ${WS_PORT}`);
});

// Maneja eventos importantes
aedes.on('client', function (client) {
    console.log(`Cliente conectado: ${client.id}`);
});

aedes.on('clientDisconnect', function (client) {
    console.log(`Cliente desconectado: ${client.id}`);
});

aedes.on('publish', function (packet, client) {
    if (client) {
        console.log(`Mensaje publicado por ${client.id}: ${packet.payload}`);
    }
});

aedes.on('subscribe', function (subscriptions, client) {
    console.log(`Cliente ${client.id} suscrito a: ${subscriptions.map(s => s.topic).join(', ')}`);
});
