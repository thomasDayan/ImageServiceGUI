var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var registerRouter = require("./routes/Register");
var messageRouter = require("./routes/Messages");
var Schema = require("./models/Users");
var UsersModel = Schema.usersSchema;
var MessageModel = Schema.messagesSchema;
var logOutRouter = require("./routes/LogOut");
var logInRouter = require("./routes/LogIn");
var profileRouter = require("./routes/Profile");
const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/";

mongoose.connect(url, {
  useMongoClient: true
});

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/Register", registerRouter);
app.use("/LogOut", logOutRouter);
app.use("/LogIn", logInRouter);
app.use("/Users", UsersModel);
app.use("/Profile", profileRouter);
app.use("/Message", MessageModel);
app.use("/Messages", messageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
