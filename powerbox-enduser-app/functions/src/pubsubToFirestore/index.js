const functions = require('firebase-functions')

export default functions.pubsub.topic('bme280').onPublish(message => {
  const messageBody = message.data
    ? Buffer.from(message.data, 'base64').toString()
    : null
  console.log(`Hello ${messageBody || 'World'}!`)
  return null
})
