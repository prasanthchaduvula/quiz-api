var express = require("express");
var User = require("../models/user");
var Mark = require("../models/marks");
var userauth = require("../modules/user.auth");
var router = express.Router();

// protected routes
router.use(userauth.validateToken);

// get a single user
router.get("/", (req, res) => {
  User.findById(req.user.userId, "-password")
    .populate("marksId")
    .exec((err, user) => {
      if (err) return res.json({ err });
      res.json({ user, success: true });
    });
});

// post marks
router.post("/submit", (req, res) => {
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
});

module.exports = router;
