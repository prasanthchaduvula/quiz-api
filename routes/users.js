var express = require("express");
var User = require("../models/user");
var jwt = require("jsonwebtoken");
var router = express.Router();

// user signup
router.post("/signup", (req, res) => {
  User.create(req.body, (err, user) => {
    if (err) return res.json({ err });
    res.json({ success: true, message: "successfully registred" });
  });
});

// user signin

router.post("/signin", (req, res) => {
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
});
module.exports = router;
