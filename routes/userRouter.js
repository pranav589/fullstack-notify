const express = require("express");
const router = express.Router();
const userController=require("../controllers/userController")
const auth=require("../middleware/auth")

//register the user
router.post("/register", userController.registerUser);

//login the user
router.post("/login", userController.loginUser);

//verify token
router.get('/verify',userController.verifiedToken)

module.exports = router;
