const express = require("express");
const router = express.Router();
const NotificationController = require("../controllers/NotificationController");
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)
router.route("/").get(NotificationController.getNotification);

router.route("/bulk").post(NotificationController.postNotification);

router.route(":notificationId").patch(NotificationController.patchNotification)

module.exports = router