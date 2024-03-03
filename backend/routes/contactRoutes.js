const express = require('express')
const router = express.Router()
const ContactController = require('../controllers/ContactController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)
router.route("/:username")
 .get(ContactController.getContactByUsername)

 router.route("/")
 .post(ContactController.CreateNewContact)

 router.route("/:contactId")
 .delete(ContactController.deleteContact)

module.exports= router