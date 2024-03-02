const mongoose = require("mongoose");

const BankAccountSchema = new mongoose.Schema({
  // id: { type: String, require: true },
  uuid: { type: String, require: true },
  bankName: { type: String, require: true },
  userId: {type: String, require: true },
  accountNumber: { type: String, require: true },
  routingNumber: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});

const BankAccount = mongoose.model("BankAccount",BankAccountSchema);

module.exports = BankAccount;
