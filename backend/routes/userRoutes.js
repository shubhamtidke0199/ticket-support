const express = require("express");
const { registerUser, loginUser, userDetails, allUsers } = require("../controllers/userController");
const {protect} = require("../middleware/authMiddleware");
const notificationRouter = require("./notificationRoutes");
const router = express.Router(); 

// Register details is posted
router.post("/", registerUser)

// Login route
router.post("/login", loginUser)

//Get information about user
router.get("/user", protect, userDetails)

// all users
router.get("/all", allUsers)

//Notifications route
router.use('/user/notifications', notificationRouter)
module.exports = router;

