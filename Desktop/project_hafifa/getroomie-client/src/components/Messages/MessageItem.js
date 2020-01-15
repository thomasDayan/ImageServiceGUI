import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import SpecificMessages from "./SpecificMessages";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";

import * as Constants from "../Constants";

class MessageItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectHome: false,
      messageArray: [],
      specificMessageArray: [],
      messageBack: "",
      userId: "",
      userName: ""
    };
  }

  componentDidMount() {
    this.setState({ userName: this.props.userName });
  }

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    const classes = makeStyles(theme => ({
      root: {
        margin: "10px",
        padding: theme.spacing(10),
        justifyContent: "space-between"
      },
      div: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        padding: theme.spacing(10),
        width: 200
      },
      inline: {
        display: "inline"
      }
    }));

    return (
      <div>
        <ListItem
          style={{
            whiteSpace: "normal"
          }}
        >
          <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              style={{ color: "#607d8b" }}
              src={
                this.props.userId === this.props.listItem.userIdReceiver
                  ? this.props.listItem.pictureSender
                  : this.props.listItem.pictureReceiver
              }
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
                    onClick={() => {
                      let userId =
                        this.props.userId === this.props.listItem.userIdReceiver
                          ? this.props.listItem.userIdSender
                          : this.props.listItem.userIdReceiver;
                      let userName =
                        this.props.userId === this.props.listItem.userIdReceiver
                          ? this.props.listItem.userNameSender
                          : this.props.listItem.userNameReceiver;
                      this.setState({
                        chosenSpecificId: userId,
                        chosenSpecificName: userName
                      });
                      this.handleToggle();
                    }}
                    style={{
                      textDecoration: "none"
                    }}
                  >
                    {this.props.userId === this.props.listItem.userIdReceiver
                      ? this.props.listItem.userNameSender
                      : this.props.listItem.userNameReceiver}
                  </Link>{" "}
                </b>
              </Typography>
            }
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  varient="body2"
                  className={classes.inline}
                  style={{
                    display: "inline",
                    fontSize: "10px"
                  }}
                >
                  {this.props.listItem.date}{" "}
                </Typography>
                <Box
                  component="span"
                  varient="body2"
                  className={classes.inline}
                  whiteSpace="normal"
                  style={{
                    color: "#616161",
                    display: "inline",
                    textAlign: "justify",
                    whiteSpace: "normal"
                  }}
                >
                  {this.props.listItem.message}
                </Box>
              </React.Fragment>
            }
          />

          <Dialog open={this.state.open} onClose={this.handleToggle} fullWidth>
            <DialogTitle id="form-dialog-title">
              <SpecificMessages
                id={this.props.userId}
                idFirst={this.state.chosenSpecificId}
                nameFirst={this.state.chosenSpecificName}
                idSecond={this.props.userId}
                nameSecond={this.props.userName}
              />
            </DialogTitle>
          </Dialog>
        </ListItem>
      </div>
    );
  }
}

export default MessageItem;
