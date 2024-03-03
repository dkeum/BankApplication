const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/TransactionController");
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)
router
  .route("/")
  .get(TransactionController.getTransaction)
  .post(TransactionController.postTransaction);

router.route("/contacts").get(TransactionController.getTransactionsContact);

router.route("/public").get(TransactionController.getTransactionsContact);

router
  .route("/:transactionId")
  .get(TransactionController.getTransactionsById)
  .patch(TransactionController.patchTransaction);

  module.exports= router
