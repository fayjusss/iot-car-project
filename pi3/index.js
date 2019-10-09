var fs = require('fs'); 
var jwt = require('jsonwebtoken'); 
var mqtt = require('mqtt'); 
var BME280 = require('bme280-sensor');
// By Aram
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(4, 'out'); //use GPIO pin 4, and specify that it is output
var blinkInterval = setInterval(blinkLED, 250); //run the blinkLED function every 250ms

function blinkLED() { //function to start blinking
  if (LED.readSync() === 0) { //check the pin state, if the state is 0 (or off)
    LED.writeSync(1); //set pin state to 1 (turn LED on)
  } else {
    LED.writeSync(0); //set pin state to 0 (turn LED off)
  }
}

function endBlink() { //function to stop blinking
  clearInterval(blinkInterval); // Stop blink intervals
  LED.writeSync(0); // Turn LED off
  LED.unexport(); // Unexport GPIO to free resources
}
// END By Aram


// The BME280 constructor options are optional.
const options = {
  i2cBusNo   : 1, // defaults to 1
  i2cAddress :  0x76
};

const bme280 = new BME280(options);
 
var projectId = 'oamk-iot-powerbox'; 
var cloudRegion = 'europe-west1'; 
var registryId = 'pi3-powerbox-1'; 
var deviceId = 'siva-powerbox-001'; 
 
var mqttHost = 'mqtt.googleapis.com'; 
var mqttPort = 8883; 
var privateKeyFile = './certs/rsa_private.pem';
var algorithm = 'RS256'; 
var messageType = 'state'; // or event 
 
var mqttClientId = 'projects/' + projectId + '/locations/' + cloudRegion + '/registries/' + registryId + '/devices/' + deviceId; 
var mqttTopic = '/devices/' + deviceId + '/' + messageType; 
 
var connectionArgs = { 
  host: mqttHost, 
  port: mqttPort, 
  clientId: mqttClientId, 
  username: 'unused', 
  password: createJwt(projectId, privateKeyFile, algorithm), 
  protocol: 'mqtts', 
  secureProtocol: 'TLSv1_2_method' 
}; 
 
console.log('Connecting...'); 
var client = mqtt.connect(connectionArgs); 
 
// Subscribe to the /devices/{device-id}/config topic to receive config updates. 
client.subscribe('/devices/' + deviceId + '/config'); 
 
client.on('connect', function(success) { 
  if (success) { 
    console.log('Client connected...'); 
    // Initialize the BME280 sensor
    //
    bme280.init()
    .then(() => {
      console.log('BME280 initialization succeeded');
      readSensorData();
    })
    .catch((err) => console.error(`BME280 initialization failed: ${err} `)); 
  } else { 
    console.log('Client not connected...'); 
  } 
}); 
 
client.on('close', function() {
  console.log('close'); 
}); 
 
client.on('error', function(err) { 
  console.log('error', err); 
}); 
 
client.on('message', function(topic, message, packet) { 
  setTimeout(endBlink, 5000);
  console.log(topic, 'message received: ', Buffer.from(message, 'base64').toString('ascii')); 
}); 
 

function createJwt(projectId, privateKeyFile, algorithm) { 
  var token = { 
    'iat': parseInt(Date.now() / 1000), 
    'exp': parseInt(Date.now() / 1000) + 20 * 60, // 1 day 
    'aud': projectId 
  }; 
  var privateKey = fs.readFileSync(privateKeyFile); 
  return jwt.sign(token, privateKey, { 
    algorithm: algorithm 
  }); 
}

function readSensorData(){
  bme280.readSensorData()
    .then((data) => {
      // temperature_C, pressure_hPa, and humidity are returned by default.
      // I'll also calculate some unit conversions for display purposes.
 
      var payload = createPayload(data.temperature_C, data.humidity);
      sendData(payload);
      console.log('Transmitting in 15 seconds'); 
      setTimeout(readSensorData, 15000); 
    })
    .catch((err) => {
      console.log(`BME280 read error: ${err}`);
      setTimeout(readSensorData, 15000);
    });
};
 
function createPayload(temp, humd) {
  return {
    'temp': temp.toFixed(2), 
    'humd': humd.toFixed(2), 
    'time': new Date().toISOString().slice(0, 19).replace('T', ' ') // https://stackoverflow.com/a/11150727/1015046 
  }; 
}
 
function sendData(payload) {  
  payload = JSON.stringify(payload); 
  console.log(mqttTopic, ': Publishing message:', payload); 
  client.publish(mqttTopic, payload, { qos: 1 }); 
}