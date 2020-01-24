var express = require("express");
var Admin = require("../models/admin");
var jwt = require("jsonwebtoken");
var router = express.Router();

// admin signup
router.post("/signup", (req, res) => {
  Admin.create(req.body, (err, admin) => {
    if (err) return res.json({ err });
    res.json({ success: true, message: "successfully registred" });
  });
});

// admin signin

router.post("/signin", (req, res) => {
  let { adminPassword, adminEmail } = req.body;
  Admin.findOne({ adminEmail }, (err, admin) => {
    if (err) return res.json({ err });
    if (!admin) return res.json({ email: true, message: "enter valid email" });
    if (!admin.verifyPassword(adminPassword))
      return res.json({ success: false, message: "password didn't match" });
    // jwt sign
    jwt.sign(
      {
        adminName: admin.adminName,
        adminId: admin._id,
        adminEmail: admin.adminEmail
      },
      "thisissecret",
      (err, token) => {
        res.json({
          token,
          success: true,
          adminName: admin.adminName,
          adminId: admin._id
        });
      }
    );
  });
});

module.exports = router;
