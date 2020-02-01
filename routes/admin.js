var express = require("express");
var Admin = require("../models/admin");
var adminauth = require("../modules/admin.auth");
var adminController = require("../controllers/adminController");

var router = express.Router();

// get a single admin
router.get("/", adminauth.validateToken, adminController.getSingleAdmin);

module.exports = router;
