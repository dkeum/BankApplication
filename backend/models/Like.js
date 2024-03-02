const mongoose = require("mongoose")


const LikeSchema = new mongoose.Schema({
    id: {type: String, required:true },
    uuid: {type: String, required:true },
    content: {type: String, required:true },
    userId: {type: String, required:true },
    transactionId: {type: String, required:true },
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
})

const Like= mongoose.model("Like", LikeSchema)

module.exports = Like