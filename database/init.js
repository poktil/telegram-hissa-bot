const admin = require('firebase-admin')

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CONFIG)),
})

const firestore = admin.firestore()

module.exports = {
  firestore,
}
