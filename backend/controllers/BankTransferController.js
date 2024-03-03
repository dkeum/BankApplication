const BankTransfer = require("../models/BankTransfer")
const asyncHandler = require("express-async-handler")

const getBankTransferbyUserId = asyncHandler(async(req,res)=>{
    
    const userId = req.user.id
    
    const banktransfers = await BankTransfer.find({userId}).exec()
    
    if(!banktransfers || banktransfers.length===0 ){
        return res.status(400).json({message:"no bank transfers found "})
    } 
    res.status(200).json({banktransfers})

})

module.exports = {getBankTransferbyUserId}