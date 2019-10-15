import { Response, Request } from 'express'
import db from './db'

function postExpense(req: Request, res: Response) {
  const { photo, date, type, amount, refundId } = req.body
  const partialExpense = { photo, date, type, amount, refundId }
  db.getInstance()
    .collection('expenses')
    .add(partialExpense)
    .then((doc: any) => {
      res.status(200).send({ id: doc.id, ...partialExpense })
    })
    .catch((err: any) => {
      res.status(500).send(err)
    })
}

function deleteExpense(req: Request, res: Response) {
  db.getInstance()
    .collection('expenses')
    .doc(req.params.id)
    .delete()
    .then(() => {
      res.status(200).send()
    })
    .catch((err: any) => {
      res.status(500).send(err)
    })
}

export default { postExpense, deleteExpense }
