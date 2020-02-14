var express = require("express");
var app = express();
var mongoose = require("mongoose");

var router = express.Router();
var Schema = require("../models/Users");
var Users = Schema.usersSchema;
var Messages = Schema.messagesSchema;
var Cookie = require("./Cookie");
var details = require("./Details");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

/*
 * get all messages from user in the cookie
 */
router.get("/", (req, res) => {
  let query = {
    $or: [
      { userIdReceiver: req.cookies[Cookie.userCookie].id },
      { userIdSender: req.cookies[Cookie.userCookie].id }
    ]
  };

  try {
    Messages.find(query)
      .exec()
      .then(async doc => {
        console.log(doc);
        doc = doc.reverse();
        doc = deleteDuplicate(doc);
        doc = await createReturnArray(doc);
        res.status(details.ACCEPT).json(doc);
      })
      .catch(err => {
        console.log(err);
        res.status(details.ERROR).json({ error: err });
      });
  } catch {
    res.status(details.ERROR).json({ error: "Error occur" });
  }
});

router.get("/:userId", (req, res) => {
  let query = {
    $or: [
      { userIdReceiver: req.cookies[Cookie.userCookie].id },
      { userIdSender: req.cookies[Cookie.userCookie].id }
    ]
  };

  try {
    Messages.find(query)
      .exec()
      .then(async doc => {
        console.log(doc);
        doc = doc.reverse();
        doc = await getConversation(
          doc,
          req.params.userId,
          req.cookies[Cookie.userCookie].id
        );
        res.status(details.ACCEPT).json(doc);
      })
      .catch(err => {
        console.log(err);
        res.status(details.ERROR).json({ error: err });
      });
  } catch {
    res.status(details.ERROR).json({ error: "Error occur" });
  }
});

router.post("/", (req, res) => {
  try {
    var messages = new Messages({
      _id: new mongoose.Types.ObjectId(),
      userIdSender: req.body.userIdSender,
      userIdReceiver: req.body.userIdReceiver,
      message: req.body.message,
      date: req.body.date
    });
    messages.save().then(result => {
      console.log(result);
      res.status(details.ACCEPT).json({ message: "Message sent" });
    });
  } catch {
    res
      .status(details.ERROR)
      .json({ message: "Problem occur when message saving" });
  }
});

async function getConversation(array, userId, myId) {
  let res_Arr = [];
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i].toObject();

    if (
      (array[i].userIdReceiver == userId && array[i].userIdSender == myId) ||
      (array[i].userIdSender == userId && array[i].userIdReceiver == myId)
    ) {
      let userNameSender = await Users.findOne({
        id: array[i].userIdSender
      });
      /*await dbc
        .collection(details.userDbName)
        .findOne({ id: array[i].userIdSender });*/
      array[i].pictureSender = userNameSender.profilePic;

      let userNameReceiver = await Users.findOne({
        id: array[i].userIdReceiver
      });
      array[i].pictureReceiver = userNameReceiver.profilePic;
      res_Arr.push(array[i]);
    }
  }
  return res_Arr;
}

function deleteDuplicate(array) {
  let res_Arr = [];
  for (let i = 0; i < array.length; i++) {
    let temp = 0;
    for (let j = 0; j < i; j++) {
      if (
        (array[i].userIdReceiver == array[j].userIdReceiver ||
          array[i].userIdReceiver == array[j].userIdSender) &&
        (array[i].userIdSender == array[j].userIdReceiver ||
          array[i].userIdSender == array[j].userIdSender)
      ) {
        temp = 1;
      }
    }
    if (temp == 0) {
      res_Arr.push(array[i]);
    }
  }
  return res_Arr;
}

async function createReturnArray(array) {
  let messageArray = array.slice();

  for (let i = 0; i < messageArray.length; i++) {
    messageArray[i] = messageArray[i].toObject();

    let userNameSender = await Users.findOne({
      id: messageArray[i].userIdSender
    });

    messageArray[i].userNameSender = userNameSender.userName;
    console.log("the new is : \n " + messageArray[i]);
    console.log("test the usernamesender : " + messageArray[i].userNameSender);
    //messageArray[i].pictureSender = userNameSender.profilePic;

    let userNameReceiver = await Users.findOne({
      id: messageArray[i].userIdReceiver
    });

    messageArray[i].userNameReceiver = userNameReceiver.userName;
    //messageArray[i].pictureReceiver = userNameReceiver.profilePic;*/
  }
  return messageArray;
}

module.exports = router;
