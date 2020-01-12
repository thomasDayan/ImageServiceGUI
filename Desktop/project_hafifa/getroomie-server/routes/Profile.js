var express = require("express");
var app = express();
var router = express.Router();
var Users = require("../models/Users");
var Cookie = require("./Cookie");
var details = require("./Details");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

/*
 * Return the user from the cookie
 */
router.get("/", (req, res) => {
  try {
    Users.find({ id: req.cookies[Cookie.userCookie].id })
      .exec()
      .then(doc => {
        console.log(doc);
        res.status(details.ACCEPT).json(doc);
      })
      .catch(err => {
        console.log(err);
        res.status(details.ERROR).json({ error: err });
      });
  } catch {
    res.status(details.ERROR).json({ error: "no user logged in " });
  }
});

module.exports = router;
