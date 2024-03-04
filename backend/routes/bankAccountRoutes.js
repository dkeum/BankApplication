const express = require("express")
const router = express.Router()
const BankAccountController = require("../controllers/BankAccountController")
const verifyJWT = require('../middleware/verifyJWT')
const validateMiddleware = require('../middleware/validateData')
const isBankAccountValidator = require('../validation/validator')


router.use(verifyJWT)
router.route("/")
     .get(BankAccountController.getAllBankAccount)
     .post(validateMiddleware([isBankAccountValidator]),BankAccountController.createBankAccount)
     .patch(BankAccountController.updateBankAccount)
     

router.route("/:bankAccountId")
     .get(BankAccountController.getBankAccountByID)
     .delete(BankAccountController.deleteBankAccount)



module.exports = router