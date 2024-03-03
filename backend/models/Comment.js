const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
    uuid: {type: String, required:true },
    content: {type: String, required:true },
    userId: {type: String, required:true },
    transactionId: {type: String, required:true },
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
})

const Comment = mongoose.model("Comment", CommentSchema)

module.exports = Comment