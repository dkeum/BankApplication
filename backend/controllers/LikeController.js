const Like = require("../models/Like");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");

//GET /likes/:transactionId
const getLike = asyncHandler(async (req, res) => {
  const { transactionId } = req.params;
  const likes = await Like.find({ transactionId });
  res.status(200).json({ likes });
});

//POST /likes/:transactionId
const postLike = asyncHandler(async (req, res) => {
  const { transactionId } = req.body;
  const userId = req.user;
  // Create a new like
  const uuid = uuidv4();
  const createdAt = Date.now();
  const modifiedAt = Date.now();
  const newLike = await Like.create({
    transactionId,
    userId,
    uuid,
    createdAt,
    modifiedAt,
  });
  res.status(201).json({ like: newLike });
});

module.exports = { getLike, postLike };
