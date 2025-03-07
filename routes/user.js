//[SECTION] Dependencies and Modules
const express = require('express');
const userController = require('../controllers/user');
const { verify } = require("../auth");

//[SECTION] Routing Component
const router = express.Router();

//[SECTION] Checking if the email already exists
router.post("/check-email", userController.checkEmailExists);

//[SECTION] Route for User Registration
router.post("/register", userController.registerUser);

//[SECTION] Route for User Login
router.post("/login", userController.loginUser);


//[Section] Activity: Route for retrieving user details
router.get("/details", verify, userController.getProfile);

//[SECTION] Activity: Route to get the user's enrollements array
router.get('/get-enrollments', verify, userController.getEnrollments);

module.exports = router;
