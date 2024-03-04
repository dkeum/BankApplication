const {Transaction} = require("../models/Transaction");
const asyncHandler = require("express-async-handler");
const transactionUtil = require('../util/transactionUtil')
const { v4: uuidv4 } = require("uuid");

//GET /transactions - scoped user, auth-required
const getTransaction = asyncHandler(async (req, res) => 
{

  const userId = req.user.id
  const queryPage = req.query.page
  const queryLimit = req.query.limit

  //page limited transactions

  const transactions = await Transaction.find({userId}); // Example: limit to 10 transactions
  const { totalPages, data: paginatedItems } = transactionUtil.getPaginatedItems(queryPage,queryLimit,transactions)

  
  res.status(200).json({
    pageData: {
      page: res.locals.paginate.page,
      limit: res.locals.paginate.limit,
      hasNextPages: res.locals.paginate.hasNextPages(totalPages),
      totalPages,
    },
    results: paginatedItems,
  });
});

//GET /transactions/contacts - scoped user, auth-required
const getTransactionsContact = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const contactId = req.query.contactId
 

  //page limited transactions

  const sentTransactions = await Transaction.find({senderId: userId, receiverId: contactId}); // Example: limit to 10 transactions
  const receivedTransactions = await Transaction.find({senderId: contactId, receiverId: userId}); // Example: limit to 10 transactions
  const transactions = sentTransactions.concat(receivedTransactions)
  const { totalPages, data: paginatedItems } = transactionUtil.getPaginatedItems(queryPage,queryLimit,transactions)

  
  res.status(200).json({
    pageData: {
      page: res.locals.paginate.page,
      limit: res.locals.paginate.limit,
      hasNextPages: res.locals.paginate.hasNextPages(totalPages),
      totalPages,
    },
    results: paginatedItems,
  });

});

//GET /transactions/public - auth-required
const getTransactionsPublic = asyncHandler(async (req, res) => {
  const isFirstPage = req.query.page === '1'; // Compare with string '1' instead of number 1
  const userId = req.user.id;
  
  let transactions;

  const topFiveUserTransactions = await Transaction.find({ userId }).sort({ createdAt: -1 }).limit(5); // Sort by createdAt date and limit to 5
  const publicTransactions = await Transaction.find({ userId: { $ne: userId } }); // Find transactions not belonging to the user

  transactions = topFiveUserTransactions.concat(publicTransactions);

  const { totalPages, data: paginatedItems } = getPaginatedItems(
    req.query.page,
    req.query.limit,
    isFirstPage ? transactions.slice(0, req.query.limit) : transactions // Adjusted to slice the transactions for the first page
  );

  res.status(200).json({
    pageData: {
      page: req.query.page,
      limit: req.query.limit,
      hasNextPages: req.query.page < totalPages, // Compare with totalPages
      totalPages,
    },
    results: paginatedItems,
  });
});

//GET /transactions/:transactionId - scoped-user
const getTransactionsById = asyncHandler(async (req, res) => {
  const { transactionId } = req.params;
  const transaction = await Transaction.findById(transactionId);
  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }
  res.status(200).json({ transaction });
});

//POST /transactions - scoped-user
const postTransaction = asyncHandler(async (req, res) => {
    const {source, amount, description,receiverId} = req.body
    const userId = req.user.id
    const uuid = uuidv4();
    const createdAt = Date.now();
    const modifiedAt = Date.now();

    const newTransaction = await Transaction.create({
      uuid,
      source,
      amount,
      description,
      userId,
      receiverId,
      createdAt,
      modifiedAt
    })

    if(!newTransaction){
      return res.status(500).json({ message: "Server error" });
  }
  res.status(201).json({ transaction: newTransaction });

});

//PATCH /transactions/:transactionId - scoped-user
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
