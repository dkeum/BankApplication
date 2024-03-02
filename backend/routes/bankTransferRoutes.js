const express = require('express')
const router = express.Router()
const bankTransferController = require('../controllers/BankTransferController')

router.route("/").get(bankTransferController.getBankTransferbyUserId)

module.exports= router