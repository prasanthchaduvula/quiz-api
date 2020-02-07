var Question = require("../models/question");
var Admin = require("../models/admin");
var Quizset = require("../models/quizset");
module.exports = {
  // get all questions
  getQuestions: (req, res) => {
    Question.find({}, (err, questions) => {
      if (err) return res.json({ err });
      res.json({ questions, success: true });
    });
  },

  // get all quizsets
  getQuizsets: (req, res) => {
    Quizset.find({})
      .populate("questionsId")
      .exec((err, quizsets) => {
        if (err) return res.json({ err });
        res.json({ quizsets, success: true });
      });
  },

  // get a single quizset
  getSingleQuizset: (req, res) => {
    Quizset.findById(req.params.id)
      .populate({ path: "questionsId" })
      .exec((err, quizset) => {
        if (err) return res.json({ err });
        res.json({ quizset, success: true });
      });
  },

  // create a quizset
  createQuizset: (req, res) => {
    let { adminId } = req.admin;
    Quizset.findOne({ quizsetName: req.body.quizsetName }, (err, quizset) => {
      if (err) return res.json({ err });
      if (!quizset) {
        Quizset.create(req.body, (err, createdQuizset) => {
          if (err) return res.json({ err });
          Admin.findByIdAndUpdate(
            adminId,
            { $push: { quizsetsId: createdQuizset.id } },
            { new: true },
            (err, updatedAdmin) => {
              if (err) return res.json({ err });
              return res.json({ createdQuizset, success: true });
            }
          );
        });
      }
      if (quizset)
        return res.json({
          message: "already another quizset is created with the same name"
        });
    });
  },

  // delete a quizset
  deleteQuizset: (req, res) => {
    Quizset.findById(req.params.id, (err, quizset) => {
      if (err) return res.json({ err });
      if (!quizset) return res.json({ message: "no quizsets found" });
      Quizset.findByIdAndDelete(req.params.id, (err, deletedQuizset) => {
        if (err) return res.json({ err });
        console.log(quizset.questionsId.length);
        // delete questions inside quizset
        if (quizset.questionsId.length) {
          quizset.questionsId.forEach(question => {
            Question.findByIdAndDelete(question._id, (err, deletedQuestion) => {
              if (err) return res.json({ err });
            });
          });
        } else {
          return res.json({ success: true, message: "No questions to delete" });
        }
        res.json({
          deletedQuizset,
          success: true,
          message: "deleted successfully"
        });
      });
    });
  },

  // edit a quizzset
  editQuizset: (req, res) => {
    Quizset.findOne({ quizsetName: req.body.quizsetName }, (err, quizset) => {
      if (err) return res.json({ err });
      if (!quizset) {
        Quizset.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true },
          (err, updatedQuizset) => {
            if (err) return res.json({ err });
            res.json({
              updatedQuizset,
              success: true,
              message: "updated quizset successfully"
            });
          }
        );
      }
      if (quizset)
        return res.json({
          message: "already another quizset is created with the same name"
        });
    });
  },

  // create a question
  createQuestion: (req, res) => {
    Question.create(req.body, (err, createdQuestion) => {
      console.log(req.body);
      if (err) return res.json({ err });
      Quizset.findByIdAndUpdate(
        req.params.id,
        { $push: { questionsId: createdQuestion.id } },
        { new: true },
        (err, updatedQuizset) => {
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
