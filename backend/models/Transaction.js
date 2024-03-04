const mongoose = require('mongoose');

// Define allowed values for transaction status
const transactionStatusEnum = ['pending', 'incomplete', 'complete'];
const transactionRequestStatusEnum = ["pending", "accepted", "rejected"];

const TransactionSchema = new mongoose.Schema({
    uuid: { type: String, required: true },
    source: { type: String, required: true },
    amount: { type: Number, required: true }, 
    description: { type: String, required: true },
    receiverId: { type: String, required: true },
    senderId: { type: String, required: true },
    balanceAtCompletion: { type: Number, required: false },
    transactionStatus: {
        type: String,
        enum: transactionStatusEnum, // Specify allowed values using enum
        default: 'incomplete' // Set default value
    },
    transactionRequestStatus: {
        type: String,
        enum: transactionRequestStatusEnum, // Specify allowed values using enum
        default: 'pending' // Set default value
    },
    createdAt: { type: Date, default: Date.now }, // Add createdAt field with default value
    modifiedAt: { type: Date, default: Date.now }, // Add modifiedAt field with default value
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = { Transaction, transactionStatusEnum, transactionRequestStatusEnum };
