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

/**
 * NOTE
 * need to change the picture when we know how to save picture
 */
const messagesSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userIdSender: String,
  userIdReceiver: String,
  message: String,
  date: String
});

const Users = mongoose.model("Users", usersSchema);
const Messages = mongoose.model("Messages", messagesSchema);

module.exports.usersSchema = Users;
module.exports.messagesSchema = Messages;
