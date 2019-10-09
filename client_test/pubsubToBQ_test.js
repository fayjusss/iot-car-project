var {PubSub} = require('@google-cloud/pubsub'); 
var {BigQuery} = require('@google-cloud/bigquery'); 
var projectId = 'oamk-iot-powerbox'; 
var stateSubscriber = 'sub1'; 
 
// Instantiates a client 
var pubsub = new PubSub({ 
  projectId: projectId
}); 

var bigquery = new BigQuery({ 
  projectId: projectId, 
});
 
var subscription = pubsub.subscription('projects/' + projectId + '/subscriptions/' + stateSubscriber); 
var messageHandler = function(message) { 
  var msg = event.data; 
  var data = JSON.parse(Buffer.from(msg.data, 'base64').toString()); 
  // console.log(data); 
  bigquery 
    .dataset(datasetName) 
    .table(tableName) 
    .insert(data) 
    .then(function() { 
      console.log('Inserted rows'); 
      callback(); // task done 
    }) 
    .catch(function(err) { 
      if (err && err.name === 'PartialFailureError') { 
        if (err.errors && err.errors.length > 0) { 
          console.log('Insert errors:'); 
          err.errors.forEach(function(err) { 
            console.error(err); 
          }); 
        } 
      } else { 
        console.error('ERROR:', err); 
      } 
 
      callback(); // task done 
    }); 
 
  // "Ack" (acknowledge receipt of) the message 
  message.ack(); 
}; 
 
// Listen for new messages 
subscription.on('message', messageHandler);