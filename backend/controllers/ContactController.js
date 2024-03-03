const Contact = require("../models/Contact");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");


//GET /contacts/:username
const getContactByUsername = asyncHandler(async (req, res) => {
  const { username } = req.params;

  const contacts = await Contact.find({ username });
  res.status(200).json({ contacts });
});

//POST /contacts (scoped-user)
const CreateNewContact = asyncHandler(async (req, res) => {
  const { contactId } = req.body;
  const userId = req.user

  const uuid = uuidv4();
    const createdAt = Date.now();
    const modifiedAt = Date.now();

  const newContact = await Contact.create({ contactId, userId ,uuid, createdAt,modifiedAt });
  res.status(201).json({ contact: newContact });
});

//DELETE /contacts/:contactId (scoped-user)
const deleteContact = asyncHandler(async (req, res) => {
  const { contactId } = req.params;

  const deletedContact = await Contact.findByIdAndDelete(contactId);
  if (!deletedContact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  res.status(200).json({ message: "Contact deleted successfully" });
});

module.exports = { getContactByUsername, CreateNewContact, deleteContact };
