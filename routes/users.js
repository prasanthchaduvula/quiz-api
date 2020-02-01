var express = require("express");
var User = require("../models/user");
var jwt = require("jsonwebtoken");
var userController = require("../controllers/userController");
var router = express.Router();

// user signup
router.post("/signup", userController.userSignup);

// user signin

router.post("/signin", userController.userSignin);
module.exports = router;
