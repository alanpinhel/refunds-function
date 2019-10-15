import * as functions from 'firebase-functions'
import { refundService } from '../shared'

const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/', refundService.getRefunds)
app.post('/', refundService.postRefund)
app.get('/:id', refundService.getRefund)
app.delete('/:id', refundService.deleteRefund)

export default functions.https.onRequest(app)
