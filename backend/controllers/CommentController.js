const Comment = require('../models/Comment')
const asyncHandler = require("express-async-handler")
const { v4: uuidv4 } = require("uuid");



//GET /comments/:transactionId
const getCommentbyTransactionId = asyncHandler(async(req,res)=>{
    const { transactionid } = req.params;
    const comments = await Comment.find({ transactionId: transactionid });
    if(!comments){
        return res.status(204).json({message:"cannot find comments"})
    }
   
    res.status(200).json({ comments });
})

//POST /comments/:transactionId
const createComment = asyncHandler(async(req,res)=>{
    const { content, transactionId } = req.body;
    const userId = req.user

    const uuid = uuidv4();
    const createdAt = Date.now();
    const modifiedAt = Date.now();

    const newComment = await Comment.create({ content, userId, transactionId ,uuid, createdAt,modifiedAt});
    if(!newComment){
        return res.status(500).json({ message: "Server error" });
    }
    res.status(201).json({ comment: newComment });
})



module.exports = {getCommentbyTransactionId,createComment}
