var express = require("express");
var Admin = require("../models/admin");
var jwt = require("jsonwebtoken");
var adminController = require("../controllers/adminController");
var router = express.Router();

// admin signup
router.post("/signup", adminController.adminSignup);

// admin signin

router.post("/signin", adminController.adminSignin);

module.exports = router;
