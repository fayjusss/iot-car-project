const admin = require('firebase-admin')
const functions = require('firebase-functions')
const db = admin.firestore()

export default functions.pubsub.topic('bme280').onPublish(message => {
  const pubsubMessage = message.data
  if (!pubsubMessage) {
    throw new Error('No telemetry data was provided!')
  }

  const payload = Buffer.from(pubsubMessage, 'base64').toString()
  const state = JSON.parse(payload)

  db.doc(`powerboxes/${state.device_id}`)
    .update({
      time: state.time,
      temp: state.temp,
      humd: state.humd
    })
    .then(writeResult => {
      console.log({ result: 'Message with ID: ' + writeResult.id + ' added.' })
      return
    })
    .catch(err => {
      console.log(err)
      return
    })
})
