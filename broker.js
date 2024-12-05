const aedes = require('aedes')();
const net = require('net');

// Carga las variables de entorno
require('dotenv').config();

// Puerto TCP para MQTT
const MQTT_PORT = process.env.MQTT_PORT || 1884;

// Inicia el servidor TCP
const mqttServer = net.createServer(aedes.handle);
mqttServer.listen(MQTT_PORT, function () {
    console.log(`MQTT Broker running on port ${MQTT_PORT}`);
});
