const { firestore } = require('./init')

async function setToFirestore(colName, docId, data) {
  try {
    await firestore.collection(colName).doc(docId).set(data)
    return { ok: true, message: 'Document successfully written!' }
  } catch (err) {
    console.error('Error writing document: ', err)
    return { ok: false, message: 'Error writing document: ' + err.message }
  }
}

module.exports = {
  setToFirestore,
}
