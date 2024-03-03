const express = require('express')
const router = express.Router()
const CommentController = require('../controllers/CommentController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)
router.route("/:transactionid")
 .get(CommentController.getCommentbyTransactionId)
 .post(CommentController.createComment)

module.exports= router