const mongoose = require("mongoose")


const ContactSchema = new mongoose.Schema({
    uuid: {type: String, required:true },
    contactId: {type: String, required:true },
    userId: {type: String, required:true },
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
})

const Contact= mongoose.model("Contact",ContactSchema)

module.exports = Contact