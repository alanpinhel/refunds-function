import db from './db'

function deleteExpenses(_snap: any, context: any) {
  const refund = context.params.refundId
  db.getInstance()
    .collection('expenses')
    .where('refundId', '==', refund)
    .get()
    .then((snapshot: any) => {
      const batch = db.getInstance().batch()
      snapshot.docs.forEach((doc: any) => {
        batch.delete(doc.ref)
      })
      batch.commit()
    })
}

export default { deleteExpenses }
