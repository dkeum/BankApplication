const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/TransactionController");
const verifyJWT = require('../middleware/verifyJWT')
const validateMiddleware = require('../middleware/validateData')
const sanitizeTransactionStatus = require('../validation/validator')
const sanitizeRequestStatus = require('../validation/validator')
const isTransactionPayloadValidator = require('../validation/validator')
const isTransactionPatchValidator = require('../validation/validator')
const isTransactionPublicQSValidator = require('../validation/validator')
const isTransactionQSValidator = require('../validation/validator')



router.use(verifyJWT)
router
  .route("/")
  .get(validateMiddleware([sanitizeTransactionStatus, sanitizeRequestStatus,  ...sanitizeTransactionStatus.isTransactionQSValidator]),TransactionController.getTransaction)
  .post(validateMiddleware(isTransactionPayloadValidator),TransactionController.postTransaction);

router.route("/contacts").get(validateMiddleware([sanitizeTransactionStatus, sanitizeRequestStatus,  ...sanitizeTransactionStatus.isTransactionQSValidator]),TransactionController.getTransactionsContact);

router.route("/public").get(validateMiddleware(isTransactionPublicQSValidator),TransactionController.getTransactionsContact);

router
  .route("/:transactionId")
  .get(TransactionController.getTransactionsById)
  .patch( validateMiddleware(isTransactionPatchValidator),TransactionController.patchTransaction);

  module.exports= router
