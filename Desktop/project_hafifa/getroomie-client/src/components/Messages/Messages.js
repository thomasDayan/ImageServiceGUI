import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Redirect, Link } from "react-router-dom";
import MessageItem from "./MessageItem";
import * as Constants from "../Constants";
import { makeStyles } from "@material-ui/core/styles";

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageArray: [],
      userId: "",
      userName: "",
      open: true,
      connected: false,
      myPic: "",
      myName: ""
    };
  }

  async checkIfConnnected() {
    const response = await fetch("/Profile");
    const body = await response.json();
    if (response.status === Constants.ACCEPT) {
      this.setState({
        connected: true,
        userId: body.id,
        myName: body.firstName,
        myPic: body.profilePic
      });
      return body;
    } else {
      this.setState({ connected: false });
      return null;
    }
  }

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };

  async componentWillMount() {
    let result = this.checkIfConnnected();
    if (result) {
      let fullname = result.firstName + " " + result.lastName;
      this.setState({ connected: true, userId: result.id, userName: fullname });
    } else {
      this.setState({ connected: false });
    }

    let array = await this.getMessages();

    this.setState({ messageArray: array });
  }

  async getMessages() {
    const response = await fetch("/Messages/", {
      headers: {
        Accept: "application/json"
      },
      method: "GET"
    });
    if (response.status === Constants.ACCEPT) {
      let resBody = await response.json();
      return resBody;
    } else {
      return JSON.stringify([]);
    }
  }

  async getSpecificMessages(userId) {
    const response = await fetch("/Messages/" + userId, {
      headers: {
        Accept: "application/json"
      },
      method: "GET"
    });
    if (response.status === Constants.ACCEPT) {
      let resBody = await response.json();
      return resBody;
    } else {
      return JSON.stringify([]);
    }
  }

  render() {
    const classes = makeStyles(theme => ({
      bigAvatar: {
        width: 40,
        height: 40
      }
    }));

    try {
      return (
        <div
          className="Home"
          style={{
            alignItems: "center",
            flexGrow: 1,
            justifyContent: "center",
            justifyItems: "center"
          }}
        >
          <List style={{}}>
            {this.state.messageArray.map(listItem => {
              return (
                <div>
                  <ListItem
                    style={{
                      whiteSpace: "normal"
                    }}
                  >
                    <MessageItem
                      listItem={listItem}
                      userId={this.state.userId}
                      userName={this.state.userName}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </div>
              );
            })}
          </List>
        </div>
      );
    } catch (e) {
      return <div></div>;
    }
  }
}

export default Messages;
