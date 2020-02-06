var express = require("express");
var Admin = require("../models/admin");
var Question = require("../models/question");
var Quizset = require("../models/quizset");
var adminauth = require("../modules/admin.auth");
var questionController = require("../controllers/questionController");
var router = express.Router();

// get all quizsets
router.get("/", adminauth.validateToken, questionController.getQuizsets);

// get single quizset
router.get(
  "/:id",
  adminauth.validateToken,
  questionController.getSingleQuizset
);

// create quizset
router.post("/", adminauth.validateToken, questionController.createQuizset);

// delete quizset
router.delete(
  "/:id",
  adminauth.validateToken,
  questionController.deleteQuizset
);

// edit a quizset
router.put("/:id", adminauth.validateToken, questionController.editQuizset);

// create a question
router.post("/:id", adminauth.validateToken, questionController.createQuestion);

module.exports = router;
