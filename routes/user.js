var express = require("express");
var User = require("../models/user");
var Mark = require("../models/marks");
var userauth = require("../modules/user.auth");
var userController = require("../controllers/userController");
var router = express.Router();

// get a single user
router.get("/", userauth.validateToken, userController.getSingleUser);

// get all quizsets
router.get("/quizsets", userauth.validateToken, userController.getQuizsets);

// get single quizset
router.get(
  "/quizsets/:id",
  userauth.validateToken,
  userController.getSingleQuizset
);

// submit test
router.post(
  "/quizsets/:id/submit",
  userauth.validateToken,
  userController.submitTest
);

module.exports = router;
