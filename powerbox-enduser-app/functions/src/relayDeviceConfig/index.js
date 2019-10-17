import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
const { google } = require('googleapis')
var client = google.cloudiot('v1')

// Note, this is BAD for production, don't do this.
var serviceAccount = {
  type: 'service_account',
  project_id: 'oamk-iot-powerbox',
  private_key_id: '1299e886e0ae7221d270b74ccad31e8d326bdc9e',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCWtBwfAhVVGU3V\nYw35sq3Mgy+9wDWTLWgZcYnkD2hbW0Tp/AROTc4Z8Gsd+pjSl0T4c2ESiYYZXna1\n0XeELWmIEywbajBytuWQd5PLnsEW17iK1/rDq4+IQEBiPdNDhivcbbdUtNlrPj3W\nBQls2qnjJJ14ZHjeTpsV1sLy/D3E6S7N5x/sEJ4PHoOu+gmCQdByJgXa4VkCwSmS\nTnVj7TcrO92Crw3c98rE0rdHSLCifTKXU3zfngyUbt0f3urFJxIu9u2D15vI/zHo\nRc/1YxGWv1Ichh3NR/2hUGsVt4KlYorl6BYp/66EgbbltqWIdENuVoOz840o5GnW\nnELYDst1AgMBAAECggEABGjSBycgOuLBGOu2J2oyTduWHyDA1BpDWNJY96Dcq7T2\n1FgKtYtgzmnvGGvnjUAXYaPZRNKxvKhJzq7CinijdvOTUwdbtcMbxcPoJSW6cCcb\nsaROzyQul5sZqrf775aETgWxlDQ+cFJqj9/gE2P1Klo9BbrFhM83if9gqcS9aQzU\nUmf4COGI9ZJ4alhjE2WXV+7qXs46OkidzwN3u2/kJYGHHx0ZCYwsc7S4Wcw1qt3L\n1JNIpVYF7tI/DnxF9EwHeLklaT+9BFbbUYEMyzELnss4lUpQDwtEbIBghRft1esb\nJLd8MM/jgX/5JcfxKZSk3Ox16S4R9PIKozRUGomZ+QKBgQDGfDaZr8utvny2C4sG\nZBuo4LLrijaqGrrMlL9+s0MJ8nW26wymmK0fjXAhj5p0b2/VSVO9QqfNPFsL1nLn\nKHgWbsd1u7jCC2NZVGpss04FL2YbvPlyxnHLsaG9ZFv9j+jnY40VH80MwkNtG64n\nZNnATCnnDjXsgY79pGYSkpkLiwKBgQDCX2qZSX/CxqpwKozvVCxf+FTNL/uB84qy\ne2KwdxnXS+TF0hRdiehherE5vR+5m7OOprva0wuWPuzZ0oP00iV56ivcNmOdHqru\n3nNz5iJ/gUi9vJXkfUUagA4/yVQCNjD1zPHFdSr3A/eBHz2mQPhweJjBv/+5HMHp\npD4sJo5k/wKBgFexa4ItTETgI0NfCDZzplDPrd0o/IvdMWjP02dMFjNf3yhI4xb7\n34lQORlq0+fbkEJgmlHFEFQ59VPelHeSxrPKj+9xV+jLlUJTbI3IDpF15pwcuu09\nxesj+PyvSYFWwqTws9WAblzTu2yKTUB0a0xtmhnOin6Koz1nE/3irSGPAoGAKnZH\nxlbtJzLZVwmkokAENa79b5nU2u3GVflodN5/8a2tu52KP2j6MBlqkA+F17lw/2/j\nSAmk1VzHx0oa86fY8go7LK9hEZj6hJZqKF6VGL+4kWKaaEEJkKF6+2pTBOyrw3bT\nNmzDRxVBw558jE5TN9bQoDr+dYUXw5/SyThfEScCgYEAw3g5NueQOEDotrYJsc8C\nJY0xYJR6XjUL6OCmXT7Z5rvY1LKpL4RV72gThQyf3yOBpnN/PNGbCty3+I7o7ZNV\nRAfR8vKm1EBPH9zjP66eU5T5NXHZD+CKxW3KMItm075ZUP4BMUWqM3NhgQuxyp+l\nUDQbe+FPzThfEpE89UbZIqo=\n-----END PRIVATE KEY-----\n',
  client_email: 'macbook-iot-client@oamk-iot-powerbox.iam.gserviceaccount.com',
  client_id: '114990487723270169628',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/macbook-iot-client%40oamk-iot-powerbox.iam.gserviceaccount.com'
}

var projectId = 'oamk-iot-powerbox'
var registryId = 'pi3-powerbox-1'
var gcpLocation = 'europe-west1'

async function configUpdate(change, context) {
  // This chunk is what authenticates the function with the API to
  // call the IoT Core APIs
  const jwtAccess = new google.auth.JWT()
  jwtAccess.fromJSON(serviceAccount)
  jwtAccess.scopes = 'https://www.googleapis.com/auth/cloud-platform'
  google.options({ auth: jwtAccess })

  if (context) {
    // the full path to our device in GCP
    var devicePath = `projects/${projectId}/locations/${gcpLocation}/registries/${registryId}/devices/${context.params.deviceId}`
    console.log(change.after.data())
    const data = JSON.stringify(change.after.data())
    const binaryData = Buffer.from(data).toString('base64')
    const request = {
      name: devicePath,
      versionToUpdate: '0',
      binaryData: binaryData
    }
    return client.projects.locations.registries.devices.modifyCloudToDeviceConfig(
      request
    )
  } else {
    throw Error('no context from trigger')
  }
}

export default functions.firestore
  .document('powerboxes/{deviceId}')
  .onWrite(configUpdate)
