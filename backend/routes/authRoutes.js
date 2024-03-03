const express = require("express")
const router = express.Router()
const authController = require('../controllers/authController')
const rateLimiter = require('../middleware/loginLimiter')


router.route("/")
.post(rateLimiter, authController.login)

router.route("/refresh")
.post(rateLimiter, authController.refresh)

router.route("/logout")
.post(rateLimiter, authController.logout)

module.exports = router