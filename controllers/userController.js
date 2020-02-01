var User = require("../models/user");
var jwt = require("jsonwebtoken");
var Mark = require("../models/marks");

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

  // post marks
  submitMarks: (req, res) => {
    let { userId } = req.user;
    req.body.userId = userId;
    Mark.create(req.body, (err, createdMark) => {
      if (err) return res.json({ err });
      User.findOneAndUpdate(
        { _id: createdMark.userId },
        { $push: { marksId: createdMark.id } },
        { new: true },
        (err, updatedUser) => {
          if (err) return res.json({ err });
          return res.json({ createdMark, success: true });
        }
      );
    });
  }
};
