const mongoose = require("mongoose");

const PaymentNotificationStatus = ["requested", "received", "incomplete"];
const NotificationTypeEnum = ["payment", "like", "comment"];

const NotificationSchema = new mongoose.Schema({
  id: { type: String, required: true },
  uuid: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: String, required: true },
  transactionId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
