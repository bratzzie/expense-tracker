const express = require('express')
const router = express.Router()
const {getTransactions} = require('../controllers/transactionController')


router.route('/').get(getTransactions)

module.exports = router