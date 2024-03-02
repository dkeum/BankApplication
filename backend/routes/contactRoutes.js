const express = require('express')
const router = express.Router()
const ContactController = require('../controllers/ContactController')

router.route("/:username")
 .get(ContactController.getContactByUsername)

 router.route("/")
 .post(ContactController.CreateNewContact)

 router.route("/:contactId")
 .post(ContactController.deleteContact)

module.exports= router