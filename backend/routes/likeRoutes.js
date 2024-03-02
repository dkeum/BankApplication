const express = require("express");
const router = express.Router();
const likeController = require("../controllers/LikeController");

router
  .route("/:transactionId")
  .get(likeController.getLike)
  .get(likeController.postLike);

module.exports = router;
