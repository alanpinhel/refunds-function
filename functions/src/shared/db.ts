import * as admin from 'firebase-admin'
let db: any = null

function getInstance(): any {
  if (!db) {
    admin.initializeApp()
    db = admin.firestore()
  }
  return db
}

export default { getInstance }
