const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyJWT = require('../middleware/verifyJWT')

// Apply verifyJWT middleware to all routes except createNewUser
router.use((req, res, next) => {
  if (req.method !== 'POST') {
    verifyJWT(req, res, next);
  } else {
    next();
  }
});

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createNewUser)
  .delete(userController.deleteUser);

router.route("/search").get(userController.getUserbyUsernameQuery);

router
  .route("/:userId")
  .get(userController.getUserbyID)
  .patch(userController.updateUser);

router.route("/profile/:username").get(userController.getUserbyUsername);

module.exports = router;
