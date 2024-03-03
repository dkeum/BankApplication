const BankAccount = require("../models/BankAccount");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");

// @ get method (user scoped)
//@ desc: for a user, get all the bank account
const getAllBankAccount = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const bankAccounts = await BankAccount.find({ userId }).select("*").lean();
  if (!bankAccounts || bankAccounts.length === 0) {
    return res.status(400).status("no bank accounts at this time");
  }
  return res.status(200).json({ bankAccounts });
});

// @ get meothod
//ROUTE: bank-account/:bankAccountId
const getBankAccountByID = asyncHandler(async (req, res) => {
  const { bankAccountId } = req.params;

  if (!bankAccountId) {
    return res.status(400).json({ message: "no id provided" });
  }

  const bankAccount = await BankAccount.findById(bankAccountId);
  if (!bankAccount) {
    return res.status(400).json({ message: "no bankAccount found by that ID" });
  }
  return res.status(200).json({ bankAccount });
});

//@ post method
const createBankAccount = asyncHandler(async (req, res) => {
  const { bankName, routingNumber, accountNumber } = req.body;
  const userId = req.user.id;


  if (!bankName || !routingNumber || !accountNumber) {
    return res.status(400).json({ message: "check fields again" });
  }

  const uuid = uuidv4();
  const createdAt = Date.now();
  const modifiedAt = Date.now();
  const newBankAccount = {
    uuid,
    bankName,
    accountNumber,
    routingNumber,
    userId,
    createdAt,
    modifiedAt,
  };

  const bankAccount = await BankAccount.create(newBankAccount);

  return res
    .status(201)
    .json({
      message: `Bank account ${bankAccount.bankName} created successfully`,
    });
});

// @ update meothod
const updateBankAccount = asyncHandler(async (req, res) => {
  const { bankName, routingNumber, accountNumber } = req.body;
  const userId = req.user.id;
 
  const retrievedBankAccount = await BankAccount.findOne({
    userId,
    bankName,
    routingNumber,
    accountNumber,
  });

  if (!retrievedBankAccount) {
    return res.status(400).json({ message: "no bank account found" });
  }

  retrievedBankAccount.bankName = bankName;
  retrievedBankAccount.routingNumber = routingNumber;
  retrievedBankAccount.accountNumber = accountNumber;
  retrievedBankAccount.modifiedAt = Date.now();

  const updatedBankAccount = await retrievedBankAccount.save();

  res
    .status(201)
    .json({
      message: `Bank Account ${updatedBankAccount.bankName} is successfully updated`,
    });
});

//@ delete method
//ROUTE: bank-account/:bankAccountId
const deleteBankAccount = asyncHandler(async (req, res) => {
  const { bankAccountId } = req.params;
  if (!bankAccountId) {
    return res.status(400).json({ message: "there no's id provided" });
  }

  const bankAccount = BankAccount.findById(bankAccountId).exec();
  if (!bankAccount) {
    return res.status(400).json({ message: "Bank Account not found" });
  }
  const result = await bankAccount.deleteOne();

  const reply = `bankAccount ${result.bankName} with ID ${result._id} deleted`;

  res.status(200).json({ message: reply });
});

module.exports = {
  getAllBankAccount,
  getBankAccountByID,
  createBankAccount,
  updateBankAccount,
  deleteBankAccount,
};
