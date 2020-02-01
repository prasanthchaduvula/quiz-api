var Question = require("../models/question");
var Admin = require("../models/admin");

module.exports = {
  // get all questions
  getQuestions: (req, res) => {
    Question.find({}, (err, questions) => {
      if (err) return res.json({ err });
      res.json({ questions, success: true });
    });
  },

  // create a question
  createQuestion: (req, res) => {
    let { adminId } = req.admin;
    req.body.adminId = adminId;
    Question.create(req.body, (err, createdQuestion) => {
      if (err) return res.json({ err });
      Admin.findOneAndUpdate(
        { _id: createdQuestion.adminId },
        { $push: { questionsId: createdQuestion.id } },
        { new: true },
        (err, updatedAdmin) => {
          if (err) return res.json({ err });
          return res.json({ createdQuestion, success: true });
        }
      );
    });
  },

  // delete a question
  deleteQuestion: (req, res) => {
    Question.findByIdAndDelete(
      { _id: req.params.id },
      (err, deletedQuestion) => {
        if (err) return res.json({ err });
        res.json({
          success: true,
          message: "deleted successfully",
          deletedQuestion
        });
      }
    );
  },

  // get a single question
  getSingleQuestion: (req, res) => {
    Question.findById(req.params.id, (err, question) => {
      if (err) return res.json({ err });
      res.json({ question, success: true });
    });
  },

  // edit question
  editQuestion: (req, res) => {
    Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (err, updatedQuestion) => {
        if (err) return res.json({ err });
        res.json({
          updatedQuestion,
          success: true,
          message: "updated successfully"
        });
      }
    );
  }
};
