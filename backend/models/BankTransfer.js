const mongoose = require('mongoose');

const BankTransferType = ['withdrawal', 'deposit']

// Define the Mongoose schema for BankTransfer
const BankTransferSchema = new mongoose.Schema({
    id: { type: String, required: true },
    uuid: { type: String, required: true },
    userId: { type: String, required: true },
    source: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: BankTransferType, required: true },
    transactionId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now },
});

// Create the Mongoose model for BankTransfer
const BankTransfer = mongoose.model('BankTransfer', BankTransferSchema);

module.exports = BankTransfer;