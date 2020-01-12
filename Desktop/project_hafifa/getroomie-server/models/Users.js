const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: String,
  userName: String,
  password: String,
  birthday: String,
  Email: String
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
