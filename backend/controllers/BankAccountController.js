const BankAccount = require("../models/BankAccount")
const asyncHandler = require("express-async-handler")
const {v4 : uuidv4} = require('uuid')



// @ get meothod 
//@ desc: for a user, get all the bank account
const getAllBankAccount = asyncHandler(async(req,res) =>{

    const bankAccounts = await BankAccount.find().select('*').lean()
    if(!bankAccounts){
       return res.status(400).status("no bank accounts at this time")
    }
    return res.status(200).json({bankAccounts})

}) 

// @ get meothod 
const getBankAccountByID = asyncHandler(async(req,res) =>{
    const {userId} = req.body

    if (!userid){
        return res.status(400).json({message: "no id provided"})
    }

    const bankAccount = await BankAccount.find({userId})
    if(!bankAccount){
        return res.status(400).json({message: "no bankAccount found by that ID"})
    }
    return res.status(200).json({bankAccount})
}) 


//@ post method 
const createBankAccount = asyncHandler(async(req,res) =>{
    const {bankName, routingNumber, accountNumber, userId } = req.body

    if(!bankName || !routingNumber || !accountNumber|| userId){
        return res.status(400).json({message:"check fields again"})
    }

    const uuid = uuidv4();
    const createdAt = Date.now();
    const modifiedAt = Date.now();
    const newBankAccount = {uuid, bankName, accountNumber, routingNumber, userId ,createdAt,modifiedAt} 

    const bankAccount = await BankAccount.create(newBankAccount)

    return res.status(201).json({ message: `Bank account ${bankAccount.bankName} created successfully` });

}) 

// @ update meothod 
const updateBankAccount = asyncHandler(async(req,res) =>{
    const { bankName, routingNumber, accountNumber, id } = req.body 

    if(!id){
        return res.status(400).json({message:"no id provided"})
    }

    const retrievedBankAccount = await BankAccount.findById(id)

    if (!retrievedBankAccount){
        return res.status(400).json({message: "no bank account found"})
    }

    retrievedBankAccount.bankName = bankName
    retrievedBankAccount.routingNumber = routingNumber
    retrievedBankAccount.accountNumber = accountNumber
    retrievedBankAccount.modifiedAt = Date.now()

    const updatedBankAccount = await retrievedBankAccount.save()

    res.status(201).json({message: `Bank Account ${updatedBankAccount.bankName} is successfully updated`})

    
}) 


//@ post method 
const deleteBankAccount = asyncHandler(async(req,res) =>{
    const { id } = req.body
    if(!id){
        return  res.status(400).json({message:"there no's id provided"})
     }
 
     const bankAccount = BankAccount.findById(id).exec()
     if(!bankAccount){
         return res.status(400).json({message: "Bank Account not found"})
     }
     const result = await bankAccount.deleteOne()
 
     const reply = `bankAccount ${result.bankName} with ID ${result._id} deleted`
 
     res.status(200).json({message: reply})
}) 


module.exports = {getAllBankAccount, getBankAccountByID ,createBankAccount, updateBankAccount, deleteBankAccount}