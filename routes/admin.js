var express = require("express");
var Admin = require("../models/admin");
var adminauth = require("../modules/admin.auth");
var router = express.Router();

// protected routes
router.use(adminauth.validateToken);

// get a single user
router.get("/", (req, res) => {
  Admin.findById(req.admin.adminId, "-password")
    .populate("questionsId")
    .exec((err, admin) => {
      if (err) return res.json({ err });
      res.json({ admin, success: true });
    });
});

module.exports = router;
