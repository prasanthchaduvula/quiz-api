var Admin = require("../models/admin");
var jwt = require("jsonwebtoken");

module.exports = {
  // signup admin
  adminSignup: (req, res) => {
    Admin.create(req.body, (err, admin) => {
      if (err) return res.json({ err });
      res.json({ success: true, message: "successfully registred" });
    });
  },

  // signin admin
  adminSignin: (req, res) => {
    let { adminPassword, adminEmail } = req.body;
    Admin.findOne({ adminEmail }, (err, admin) => {
      if (err) return res.json({ err });
      if (!admin)
        return res.json({ email: true, message: "enter valid email" });
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
  },

  // get a single admin

  getSingleAdmin: (req, res) => {
    Admin.findById(req.admin.adminId, "-adminPassword")
      .populate("questionsId")
      .exec((err, admin) => {
        if (err) return res.json({ err });
        res.json({ admin, success: true });
      });
  }
};
