const express = require('express')
const router = express.Router()
const bankTransferController = require('../controllers/BankTransferController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)
router.route("/").get(bankTransferController.getBankTransferbyUserId)

module.exports= router