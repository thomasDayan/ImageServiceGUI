var express = require("express");
var app = express();
var router = express.Router();
var Schema = require("../models/Users");
var Users = Schema.usersSchema;
var Cookie = require("./Cookie");
var details = require("./Details");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

/**
 * The user signin
 */
router.post("/", (req, res) => {
  Users.find({ id: req.body.id }) // Check if the user exists
    .exec()
    .then(doc => {
      if (doc.length === 1) {
        // Check if the password is correct
        if (doc[0].password === req.body.password) {
          let cookie_parser = {
            id: req.body.id,
            password: req.body.password
          };

          /* Save the details in cookie */

          res.cookie(Cookie.userCookie, cookie_parser);
          res.status(details.ACCEPT).json({
            message: "Correct id & password"
          });
        } else {
          res.status(details.ERROR).json({ message: "Password incorrect" });
        }
      } else {
        res.status(details.ERROR).json({
          message: "User does not exists"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(details.ERROR).json({ error: err });
    });
});

module.exports = router;
