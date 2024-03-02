const Contact = require('../models/Contact')
const asyncHandler = require("express-async-handler")


//GET
const getContactByUsername= asyncHandler(async(req,res)=>{

})

//POST
const CreateNewContact = asyncHandler(async(req,res)=>{

})

//DELETE
const deleteContact = asyncHandler(async(req,res)=>{

})



module.exports = {getContactByUsername,CreateNewContact,deleteContact}
