const Notification = require("../models/Notification");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");


//GET /notifications/
const getNotification = asyncHandler(async (req, res) => {
  const userId = req.user;
  const notifications = await Notification.find({ userId });
  res.status(200).json({ notifications });
});

//POST /notifications/bulk
const postNotification = asyncHandler(async (req, res) => {
  const { content, transactionId } = req.body;
  const userId = req.user;

  const uuid = uuidv4();
    const createdAt = Date.now();
    const modifiedAt = Date.now();

  // Create a new notification
  const newNotification = await Notification.create({
    content,
    userId,
    transactionId,
    uuid,
    createdAt,
    modifiedAt
  });
  res.status(201).json({ notification: newNotification });
});

//PATCH /notifications/:notificationId - scoped-user
const patchNotification = asyncHandler(async (req, res) => {
  const { notificationId } = req.params;
  const { content } = req.body;

  // Update the content of the notification
  const updatedNotification = await Notification.findByIdAndUpdate(
    notificationId,
    { content },
    { new: true }
  );
  res.status(200).json({ notification: updatedNotification });
});

module.exports = { getNotification, postNotification, patchNotification };
