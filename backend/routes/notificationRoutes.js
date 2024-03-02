const express = require("express");
const router = express.Router();
const NotificationController = require("../controllers/NotificationController");

router.route("/").get(NotificationController.getNotification);

router.route("/bulk").post(NotificationController.postNotification);

router.route(":notificationId").patch(NotificationController.patchNotification)

module.exports = router