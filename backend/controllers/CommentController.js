const Comment = require('../models/Comment')
const asyncHandler = require("express-async-handler")

const getCommentbyTransactionId = asyncHandler(async(req,res)=>{
    const { transactionid } = req.params;
    const comments = await Comment.find({ transactionId: transactionid });
    if(!comments){
        return res.status(400).json({message:"cannot find comments"})
    }
   
    res.status(200).json({ comments });
})


const createComment = asyncHandler(async(req,res)=>{
    const { content, userId, transactionId } = req.body;
    const newComment = await Comment.create({ content, userId, transactionId });
    if(!newComment){
        return res.status(500).json({ message: "Server error" });
    }
    res.status(201).json({ comment: newComment });
})



module.exports = {getCommentbyTransactionId,createComment}
