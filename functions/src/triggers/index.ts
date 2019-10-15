import * as functions from 'firebase-functions'
import { triggerService } from '../shared'

export const deleteExpenses = functions.firestore.document('refunds/{refundId}').onDelete(triggerService.deleteExpenses)
