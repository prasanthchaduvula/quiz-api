var express = require("express");
var User = require("../models/user");
var Mark = require("../models/marks");
var userauth = require("../modules/user.auth");
var userController = require("../controllers/userController");
var router = express.Router();

// get a single user
router.get("/", userauth.validateToken, userController.getSingleUser);

// post marks
router.post("/submit", userauth.validateToken, userController.submitMarks);

module.exports = router;
