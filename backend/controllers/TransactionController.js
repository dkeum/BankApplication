const Transaction = require("../models/Transaction");
const asyncHandler = require("express-async-handler");

const getTransaction = asyncHandler(async (req, res) => {
  //page limited transactions
  const transactions = await Transaction.find().limit(10); // Example: limit to 10 transactions
  res.status(200).json({ transactions });
});

const getTransactionsContact = asyncHandler(async (req, res) => {});

const getTransactionsPublic = asyncHandler(async (req, res) => {});

const getTransactionsById = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(transactionId);
  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }
  res.status(200).json({ transaction });
});

const postTransaction = asyncHandler(async (req, res) => {});

const patchTransaction = asyncHandler(async (req, res) => {
  const { transactionId } = req.params;
  const { description } = req.body;

  // Logic to update a specific transaction by ID
  const updatedTransaction = await Transaction.findByIdAndUpdate(
    transactionId,
    { description },
    { new: true }
  );
  if (!updatedTransaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }
  res.status(200).json({ transaction: updatedTransaction });
});

module.exports = {
  getTransaction,
  getTransactionsById,
  getTransactionsContact,
  getTransactionsPublic,
  postTransaction,
  patchTransaction,
};
