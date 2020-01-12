var express = require("express");
var router = express.Router();
var userCookie = require("./Cookie");
var details = require("./Details");
router.get("/", (err, res) => {
  /* clear all cookie */

  res.clearCookie(userCookie.userCookie);
  res.status(details.ACCEPT).json({ message: "Cleared" });
});

module.exports = router;
