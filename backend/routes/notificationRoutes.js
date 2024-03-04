const express = require("express");
const router = express.Router();
const NotificationController = require("../controllers/NotificationController");
const verifyJWT = require('../middleware/verifyJWT')
const validateMiddleware = require('../middleware/validateData')
const isNotificationsBodyValidator= require('../validation/validator')
const isNotificationPatchValidator= require('../validation/validator')

router.use(verifyJWT)
router.route("/").get(NotificationController.getNotification);

router.route("/bulk").post(validateMiddleware(isNotificationsBodyValidator),NotificationController.postNotification);

router.route(":notificationId").patch(validateMiddleware(isNotificationPatchValidator),NotificationController.patchNotification)

module.exports = router