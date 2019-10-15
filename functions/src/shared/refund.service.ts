import { Response, Request } from 'express'
import db from './db'

function getRefunds(_req: Request, res: Response) {
  db.getInstance()
    .collection('refunds')
    .get()
    .then((snapshot: any[]) => {
      const refunds: any[] = []
      snapshot.forEach(doc => {
        const { status, reason, date } = doc.data()
        refunds.push({
          id: doc.id,
          status,
          reason,
          date,
        })
      })
      res.status(200).json(refunds)
    })
    .catch((err: any) => {
      res.status(500).send(err)
    })
}

function postRefund(req: Request, res: Response) {
  const partialRefund = { date: new Date().getTime(), reason: req.body.reason, status: 'draft' }
  db.getInstance()
    .collection('refunds')
    .add(partialRefund)
    .then((doc: any) => {
      res.status(200).send({ id: doc.id, ...partialRefund })
    })
    .catch((err: any) => {
      res.status(500).send(err)
    })
}

function getRefund(req: Request, res: Response) {
  let refund: any
  db.getInstance()
    .collection('refunds')
    .doc(req.params.id)
    .get()
    .then((doc: any) => {
      const { status, reason, date } = doc.data()
      refund = {
        status,
        reason,
        date,
      }
      return db
        .getInstance()
        .collection('expenses')
        .where('refundId', '==', req.params.id)
        .get()
    })
    .then((snapshot: any[]) => {
      const expenses: any[] = []
      snapshot.forEach(doc => {
        const { photo, type, amount, date } = doc.data()
        expenses.push({
          id: doc.id,
          photo,
          type,
          amount,
          date,
        })
      })
      return {
        ...refund,
        expenses,
      }
    })
    .then((result: any) => {
      res.status(200).json(result)
    })
    .catch((err: any) => {
      res.status(500).send(err)
    })
}

function deleteRefund(req: Request, res: Response) {
  db.getInstance()
    .collection('refunds')
    .doc(req.params.id)
    .delete()
    .then(() => {
      res.status(200).send()
    })
    .catch((err: any) => {
      res.status(500).send(err)
    })
}

export default { getRefunds, postRefund, getRefund, deleteRefund }
