const express = require("express")
const router = express.Router()
const BankAccountController = require("../controllers/BankAccountController")


router.route("/")
     .get(BankAccountController.getAllBankAccount)
     .get(BankAccountController.getBankAccountByID)
     .post(BankAccountController.createBankAccount)
     .patch(BankAccountController.updateBankAccount)
     .delete(BankAccountController.deleteBankAccount)


module.exports = router