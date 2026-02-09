const { firestore } = require('./init')

async function getFromFirestore(colName, docId) {
  try {
    const doc = await firestore.collection(colName).doc(docId).get()
    if (!doc.exists) {
      return { ok: false, message: 'Document not found' }
    }
    return { ok: true, data: doc.data() }
  } catch (err) {
    console.error('Error reading document: ', err)
    return { ok: false, message: 'Error reading document: ' + err.message }
  }
}

module.exports = {
  getFromFirestore,
}
