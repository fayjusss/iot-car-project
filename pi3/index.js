var fs = require('fs');
var jwt = require('jsonwebtoken');
var mqtt = require('mqtt');
var BME280 = require('bme280-sensor');
// var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
// var ledred = new Gpio(4, 'out');
var startAutomaticTemp=0;


// The BME280 constructor options are optional.
const options = {
  i2cBusNo: 1, // defaults to 1
  i2cAddress: 0x76
};

const bme280 = new BME280(options);

var projectId = 'oamk-iot-powerbox';
var cloudRegion = 'europe-west1';
var registryId = 'pi3-powerbox-1';
var deviceId = 'siva-powerbox-001';
var starttime ;
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

client.on('connect', function (success) {
  if (success) {
    console.log('Client connected...');
    // Initialize the BME280 sensor
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

client.on('close', function () {
  console.log('close');
});

client.on('error', function (err) {
  console.log('error', err);
});

client.on('message', function (topic, message, packet) {
  var obj = JSON.parse(Buffer.from(message, 'base64').toString('ascii'));
  //ledred.writeSync(1);
  // if (obj.startnow) {
  //   trunLightOn(obj.startnow);
  // }
  // if (!obj.startnow && obj.stopnow){
  //   trunLightOff(obj.stopnow);
  // }
  // startAutomaticTemp=obj.triggeringTemp;
  //  setTimeout(endBlink, 5000);
  console.log(topic, 'message received: ', Buffer.from(message, 'base64').toString('ascii'));
  console.log('-------------------');
});
// function trunLightOn(stateValue){
//   if (stateValue){
//     starttime=new Date().toISOString().slice(0, 19).replace('T', ' ');
//     ledred.writeSync(1);
//   }
// }
// function trunLightOff(stateValue){
//   if (stateValue){

//     ledred.writeSync(0);
//     readSensorUsageData();
//   }
// }


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

function readSensorData() {
  bme280.readSensorData()
    .then((data) => {
      // temperature_C, pressure_hPa, and humidity are returned by default.
      // I'll also calculate some unit conversions for display purposes.

      var payload = createPayload(data.temperature_C, data.humidity);
      
     console.log(data.temperature_C);
    //  if (data.temperature_C<startAutomaticTemp)
    //  {
    //   trunLightOn(true);
    //  }
     

      sendData(payload);
      console.log('Transmitting in 15 seconds');
      setTimeout(readSensorData, 15000);
    })
    .catch((err) => {
      console.log(`BME280 read error: ${err}`);
      setTimeout(readSensorData, 15000);
    });
};
// function readSensorUsageData() {
//   bme280.readSensorData()
//     .then((data) => {
//       // temperature_C, pressure_hPa, and humidity are returned by default.
//       // I'll also calculate some unit conversions for display purposes.

//       var usageDt = createUsageData();
      
//      console.log(data.temperature_C);
        

//      sendUsageData(usageDt);
//       console.log('Usage Sending');
//     })
//     .catch((err) => {
//       console.log(`BME280 usage error: ${err}`);
//     });
// };
function createPayload(temp, humd) {
  return {
    'temp': temp.toFixed(2),
    'humd': humd.toFixed(2),
    'time': new Date().toISOString().slice(0, 19).replace('T', ' ') // https://stackoverflow.com/a/11150727/1015046 
  };
}

function createUsageData() {
  return {
    'DeviceId': deviceId,
    'StartTime':starttime ,
    'EndTime': new Date().toISOString().slice(0, 19).replace('T', ' ') 
  };
}

function sendData(payload) {
  payload = JSON.stringify(payload);
  console.log(mqttTopic, ': Publishing message:', payload);
  client.publish(mqttTopic, payload, { qos: 1 });
}
// function sendUsageData(Usageload) {
//   Usageload = JSON.stringify(Usageload);
//   console.log(mqttTopic, ': Publishing message:', Usageload);
//   client.publish(mqttTopic, Usageload, { qos: 1 });
// }
