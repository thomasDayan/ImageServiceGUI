var express = require("express");
var app = express();
var router = express.Router();
var mongoose = require("mongoose");
var Schema = require("../models/Users");
var Users = Schema.usersSchema;
var Cookie = require("./Cookie");
var details = require("./Details");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

/**
 * Add to the DB the new user we created.
 */
router.post("/", (req, res) => {
  const user = new Users({
    _id: new mongoose.Types.ObjectId(),
    id: req.body.id,
    userName: req.body.userName,
    password: req.body.password,
    birthday: req.body.birthday,
    Email: req.body.Email
  });
  /*
   * Check if the user exists
   */
  Users.find({ id: req.body.id })
    .exec()
    .then(doc => {
      if (doc.length === 0) {
        let cookie_parser = {
          id: req.body.id,
          password: req.body.password
        };

        /* Save the details in cookie */

        res.cookie(Cookie.userCookie, cookie_parser);
        user
          .save()
          .then(result => {
            console.log(result);
            res.status(details.ACCEPT).json({ message: "User signed up" });
          })
          .catch(err => {
            console.log(err);
            res
              .status(details.ERROR)
              .json({ message: "Error occurred when saving" });
          });
      } else {
        res.status(details.ERROR).json({
          message: "User already exists"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(details.ERROR).json({ error: err });
    });
});

/*
 * Find one user by userId
 */
router.get("/:userId", (req, res) => {
  Users.find({ id: req.params.userId })
    .exec()
    .then(doc => {
      console.log(doc);
      res.status(details.ACCEPT).json(doc);
    })
    .catch(err => {
      console.log(err);
      res.status(details.ERROR).json({ error: err });
    });
});

/*
 * Return all the users
 */
router.get("/", (req, res) => {
  Users.find({})
    .exec()
    .then(doc => {
      console.log(doc);
      res.status(details.ACCEPT).json(doc);
    })
    .catch(err => {
      console.log(err);
      res.status(details.ERROR).json({ error: err });
    });
});

module.exports = router;
