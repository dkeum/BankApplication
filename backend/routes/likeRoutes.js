const express = require("express");
const router = express.Router();
const likeController = require("../controllers/LikeController");
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)
router
  .route("/:transactionId")
  .get(likeController.getLike)
  .get(likeController.postLike);

module.exports = router;
