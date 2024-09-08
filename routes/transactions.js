const express = require('express')
const TransactionController = require('../controllers/transactionController')
const router = express.Router()


router.get('/', TransactionController.getAllTransactions)
router.post('/', TransactionController.addTransaction)
router.get('/:userId', TransactionController.detailsTransactionUserId)
router.get('/:id', TransactionController.detailsTransaction)
router.delete('/:id', TransactionController.deleteTransaction)
router.patch('/:id', TransactionController.updateTransaction)


module.exports = router