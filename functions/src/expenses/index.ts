import * as functions from 'firebase-functions'
import { expenseService } from '../shared'

const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.post('/', expenseService.postExpense)
app.delete('/:id', expenseService.deleteExpense)

export default functions.https.onRequest(app)
