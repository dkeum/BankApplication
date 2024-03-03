const User = require("../models/User");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const asyncHandler = require("express-async-handler");
const userNameRegex = /^[a-zA-Z\d]{1,16}$/;
const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^])[a-zA-Z\d!@#$%^&*]{3,30}$/;

// Route: /users  (user - scoped)
const getAllUsers = asyncHandler(async (req, res) => {
  const requesterId = req.user.id;

  const users = await User.find({ _id: { $ne: requesterId } })
    .select("-password -bankAccount -notifications")
    .lean();

  res.json({ users });
});


//GET 
// ROUTE /:userId
const getUserbyID = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({ message: "no user found" });
  }
  return res.status(200).json({ user });
});

const getUserbyUsername = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username }).exec();
  if (!user) {
    return res.status(400).json({ message: "no user found" });
  }
  return res.status(200).json({ user });
});

// ROUTE: /user/search
const getUserbyUsernameQuery = asyncHandler(async (req, res) => {
  const { q } = req.query;

  const users = await User.find({ username: { $regex: q, $options: "i" } })
    .lean()
    .exec();

  if (!user) {
    res.status(404).json({ message: "no user found" });
  }

  res.status(200).json({ users });
});

const createNewUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // date validation : (1) check if user exits
  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate username" });
  }
  // date validation : (2) check if username has characters only a-zA-Z and length is < 15
  if (!userNameRegex.test(username)) {
    return res.status(409).json({
      message:
        "check that username contains characters a-z or A-Z and less than 15 characters",
    });
  }

  // date validation : (2) check if username has characters only a-zA-Z and length is < 15
  if (!passwordRegex.test(password)) {
    return res.status(409).json({
      message:
        'check password. Can contains numbers, characters, or special symbols like "!@#$%^&*". Between 3-30 characters ',
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const uuid = uuidv4().toString();
  const userObject = { uuid, username, password: hashPassword };
  const user = User.create(userObject);

  if (user) {
    return res
      .status(200)
      .json({ message: `Successfully created user: ${username}` });
  } else {
    return res
      .status(500)
      .json({ message: `Server error... check later please: ${username}` });
  }
});

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const { id, username, password } = req.body;

  //update either username or password

  // check if username and passord is valid
  if (!id || !username || !password) {
    return res.status(400).json({ message: "you've sent a bad request" });
  }

  // checks if there's a user
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({ message: "no user exists by the ID" });
  }

  // update username
  const duplicateUser = User.findOne({ username }).lean().exec();
  if (duplicateUser._id !== id && username === duplicateUser.username) {
    return res.status(400).json({ message: "duplicate username found" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  user.username = username;
  user.password = hashPassword;
  user.modifiedAt = Date.now();

  const updatedUser = await user.save();

  res
    .status(200)
    .json({ message: `user ${updatedUser.username} sucessfully updated` });
});

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "there no's id provided" });
  }

  const user = User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }
  const result = await user.deleteOne();

  const reply = `Username ${result.username} with ID ${result._id} deleted`;

  res.status(200).json({ message: reply });
});

module.exports = {
  getAllUsers,
  getUserbyID,
  getUserbyUsername,
  getUserbyUsernameQuery,
  createNewUser,
  updateUser,
  deleteUser,
};
