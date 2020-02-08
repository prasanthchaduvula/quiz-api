var express = require("express");
var Admin = require("../models/admin");
var Question = require("../models/question");
var adminauth = require("../modules/admin.auth");
var questionController = require("../controllers/questionController");
var router = express.Router();

// get all the questions
// router.get("/", questionController.getQuestions);

// delete question
router.delete(
  "/:id",
  adminauth.validateToken,
  questionController.deleteQuestion
);

// get question
router.get(
  "/:id",
  adminauth.validateToken,
  questionController.getSingleQuestion
);

// edit question
router.put("/:id", adminauth.validateToken, questionController.editQuestion);

module.exports = router;
