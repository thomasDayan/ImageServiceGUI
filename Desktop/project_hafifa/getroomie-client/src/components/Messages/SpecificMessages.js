import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import * as Constants from "../Constants";
import { makeStyles } from "@material-ui/core/styles";

class SpecificMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specificMessageArray: [],
      myId: props.id,
      myName: "",
      recId: "",
      recName: "",
      message: "",
      rendering: true
    };
  }

  async getMessageArray(id) {
    const response = await fetch("/Messages/" + id, {
      headers: {
        Accept: "application/json"
      },
      method: "GET"
    });
    if (response.status === Constants.ACCEPT) {
      let resBody = await response.json();
      this.setState({ SpecificMessagesArray: resBody });
      this.setState({ rendering: true });
      return resBody;
    } else {
      return JSON.stringify([]);
    }
  }

  async componentDidMount() {
    if (this.props.id === this.props.idFirst) {
      this.setState({
        myName: this.props.nameFirst,
        recId: this.props.idSecond,
        recName: this.props.nameSecond
      });
    } else {
      this.setState({
        myName: this.props.nameSecond,
        recId: this.props.idFirst,
        recName: this.props.nameFirst
      });
    }
  }

  handleChange = e => {
    this.setState({ message: e.target.value });
  };

  keyPress = async e => {
    /* Note the 13 key is ENTER. When press enter = send message. */
    if (e.keyCode === 13) {
      const response = await fetch("/Messages", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          userIdSender: this.state.myId,
          userIdReceiver: this.state.recId,
          message: this.inputRef.value,
          date: new Date().toLocaleString()
        })
      });

      if (response.status === Constants.ACCEPT) {
        this.setState({ message: "" });
      }
    }
  };

  render() {
    if (this.props.id === this.props.idFirst && this.state.rendering) {
      this.setState({ rendering: false });
      this.getMessageArray(this.props.idSecond).then(result => {
        try {
          this.setState({ specificMessageArray: result.reverse() });
        } catch (e) {
          this.setState({ specificMessageArray: [] });
        }
      });
    } else if (this.props.id !== this.props.idFirst && this.state.rendering) {
      this.setState({ rendering: false });
      this.getMessageArray(this.props.idFirst).then(result => {
        try {
          this.setState({ specificMessageArray: result.reverse() });
        } catch (e) {
          this.setState({ specificMessageArray: [] });
        }
      });
    }

    const classes = makeStyles(theme => ({
      bigAvatar: {
        width: 40,
        height: 40
      }
    }));

    return (
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          scrollBehavior: ""
        }}
      >
        <List style={{}}>
          {this.state.specificMessageArray.map(listItem => {
            return (
              <div>
                <ListItem
                  style={
                    listItem.userIdSender !== this.state.myId
                      ? {
                          whiteSpace: "normal",
                          direction: "rtl",
                          textAlign: "right"
                        }
                      : {
                          whiteSpace: "normal"
                        }
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      className={classes.bigAvatar}
                      style={{ color: "#607d8b" }}
                      src={"/" + listItem.pictureSender}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        style={{
                          textDecoration: "none"
                        }}
                      >
                        <b>
                          <Link
                            href="#"
                            className={"myLink"}
                            onClick={this.handleToggle}
                            style={{
                              textDecoration: "none"
                            }}
                          >
                            {listItem.userIdSender === this.state.myId
                              ? this.state.myName
                              : this.state.recName}
                          </Link>{" "}
                        </b>
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          varient="body2"
                          style={{
                            display: "inline",
                            fontSize: "10px"
                          }}
                        >
                          {listItem.date}{" "}
                        </Typography>
                        <Box
                          component="span"
                          varient="body2"
                          whiteSpace="normal"
                          style={{
                            color: "#616161",
                            display: "inline",
                            textAlign: "justify",
                            whiteSpace: "normal"
                          }}
                        >
                          {listItem.message}
                        </Box>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </div>
            );
          })}
        </List>

        <TextField
          label="write .. "
          variant="outlined"
          value={this.state.message}
          onChange={this.handleChange}
          inputRef={ref => {
            this.inputRef = ref;
          }}
          style={{ width: "80%", left: "10%" }}
          onKeyDown={this.keyPress}
        >
          input text..
        </TextField>
      </div>
    );
  }
}

export default SpecificMessages;
