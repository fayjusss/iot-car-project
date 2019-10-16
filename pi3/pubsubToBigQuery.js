var {BigQuery} = require('@google-cloud/bigquery'); 
var projectId = 'oamk-iot-powerbox'; 
 
var bigquery = new BigQuery({ 
  projectId: projectId, 
}); 
 
var datasetName = 'pi3_powerbox_dataset'; 
var tableName = 'bme280_data'; 
 
exports.pubsubToBigQuery = function(event, context, callback) { 
  var msg = event.data; 
  var data = JSON.parse(Buffer.from(msg, 'base64').toString()); 
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
};