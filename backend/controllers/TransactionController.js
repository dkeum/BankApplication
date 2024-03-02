const Transaction = require("../models/Transaction")
const asyncHandler = require("express-async-handler")

const getTransaction = asyncHandler(async(req,res)=>{
     //page limited transactions
})

const getTransactionsContact = asyncHandler(async(req,res)=>{
     
})

const getTransactionsPublic= asyncHandler(async(req,res)=>{
     
})

const getTransactionsById = asyncHandler(async(req,res)=>{
     
})

const postTransaction = asyncHandler(async(req,res)=>{
     
})

const patchTransaction = asyncHandler(async(req,res)=>{
     
})

module.exports = {getTransaction,getTransactionsById,getTransactionsContact, getTransactionsPublic,postTransaction,patchTransaction}