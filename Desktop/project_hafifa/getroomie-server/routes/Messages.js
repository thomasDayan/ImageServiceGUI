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
 * TO COMPLETE
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
  console.log("***");
  let messageArray = array;

  for (let i = 0; i < messageArray.length; i++) {
    let userNameSender = await Users.findOne({
      id: messageArray[i].userIdSender
    });

    messageArray[i].userNameSender = userNameSender.userName;

    //messageArray[i].pictureSender = userNameSender.profilePic;

    let userNameReceiver = await Users.findOne({
      id: messageArray[i].userIdReceiver
    });
    messageArray[i].userNameReceiver = userNameReceiver.userName;
    //messageArray[i].pictureReceiver = userNameReceiver.profilePic;*/

    console.log(messageArray[i].userNameReceiver);
    console.log(messageArray[i].userNameSender);
  }
  console.log(messageArray);
  return messageArray;
}

module.exports = router;
