const express = require('express')
const router = express.Router()
const CommentController = require('../controllers/CommentController')

router.route("/:transactionid")
 .get(CommentController.getCommentbyTransactionId)
 .post(CommentController.createComment)

module.exports= router