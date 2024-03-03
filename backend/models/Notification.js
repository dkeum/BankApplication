const mongoose = require("mongoose");

const PaymentNotificationStatus = ["requested", "received", "incomplete"];
const NotificationTypeEnum = ["payment", "like", "comment"];

const NotificationSchema = new mongoose.Schema({
    uuid: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: String, required: true },
    transactionId: { type: String, required: false },
    paymentNotificationStatus: {
        type: String,
        enum: PaymentNotificationStatus,
        default: "incomplete" // Set default value
    },
    notificationType: {
        type: String,
        enum: NotificationTypeEnum,
        default: "comment" // Set default value
    },
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
