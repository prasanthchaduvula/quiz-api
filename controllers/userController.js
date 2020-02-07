var User = require("../models/user");
var jwt = require("jsonwebtoken");
var Mark = require("../models/marks");
var Quizset = require("../models/quizset");

module.exports = {
  // user signup
  userSignup: (req, res) => {
    User.create(req.body, (err, user) => {
      if (err) return res.json({ err });
      res.json({ success: true, message: "successfully registred" });
    });
  },

  // user signin
  userSignin: (req, res) => {
    let { userPassword, userEmail } = req.body;
    User.findOne({ userEmail }, (err, user) => {
      if (err) return res.json({ err });
      if (!user) return res.json({ email: true, message: "enter valid email" });
      if (!user.verifyPassword(userPassword))
        return res.json({ success: false, message: "password didn't match" });
      // jwt sign
      jwt.sign(
        {
          userName: user.userName,
          userId: user._id,
          userEmail: user.userEmail
        },
        "thisissecret",
        (err, token) => {
          res.json({
            token,
            success: true,
            userName: user.userName,
            userId: user._id
          });
        }
      );
    });
  },

  // get a single user
  getSingleUser: (req, res) => {
    User.findById(req.user.userId, "-password")
      .populate("marksId")
      .exec((err, user) => {
        if (err) return res.json({ err });
        res.json({ user, success: true });
      });
  },
  // get all quizsets
  getQuizsets: (req, res) => {
    Quizset.find({}, "-questionsId", (err, quizsets) => {
      if (err) return res.json({ err });
      res.json({ quizsets, success: true });
    });
  },

  // get a single quizset
  getSingleQuizset: (req, res) => {
    Quizset.findById(req.params.id)
      .populate({ path: "questionsId", select: "-answer" })
      .exec((err, quizset) => {
        if (err) return res.json({ err });
        res.json({ quizset, success: true, message: "hi" });
      });
  },

  // submit test
  submitTest: (req, res) => {
    let { userId } = req.user;
    req.body.userId = userId;
    console.log(req.body.attemptedQus);
    Quizset.findById(req.params.id)
      .populate("questionsId")
      .exec((err, quizset) => {
        if (err) return res.json({ err });
        if (!req.body.attemptedQus.length) {
          req.body.mark = 0;
          req.body.totalmark = quizset.questionsId.length;
          req.body.quizsetName = quizset.quizsetName;
          Mark.create(req.body, (err, createdMark) => {
            if (err) return res.json({ err });
            User.findByIdAndUpdate(
              userId,
              { $push: { marksId: createdMark.id } },
              { new: true },
              (err, updatedUser) => {
                if (err) return res.json({ err });
                return res.json({ createdMark, success: true });
              }
            );
          });
        }
        if (req.body.attemptedQus.length) {
          console.log("recievd");
          let mark = 0;
          quizset.questionsId.map(question => {
            req.body.attemptedQus.map(attemptedQ => {
              if (question._id == attemptedQ.Id) {
                if (question.answer == attemptedQ.selectedOption) {
                  mark = mark + 1;
                }
              }
            });
          });
          console.log(mark);
          req.body.mark = mark;
          req.body.totalmark = quizset.questionsId.length;
          req.body.quizsetName = quizset.quizsetName;
          Mark.create(req.body, (err, createdMark) => {
            if (err) return res.json({ err });
            User.findByIdAndUpdate(
              userId,
              { $push: { marksId: createdMark.id } },
              { new: true },
              (err, updatedUser) => {
                if (err) return res.json({ err });
                return res.json({ createdMark, success: true });
              }
            );
          });
        }
      });
  }
};
