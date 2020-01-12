import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Register from "../RegisterLogIn/Register";
import LogIn from "../RegisterLogIn/LogIn";
import Divider from "@material-ui/core/Divider";
import MenuBar from "./MenuBar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import UploadDetailsSearchHome from "../Profile/UploadDetailsSearchHome";
import UploadDetailsSearchRoomie from "../Profile/UploadDetailsSearchRoomie";
import { Redirect } from "react-router-dom";
import * as Constants from "../Constants";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: true,
      searchHome: false,
      profileOpenDialog: false,
      redirectHome: false,
      stillLoad: true
    };
  }

  /*

  create dialog of the profile details, tells us if he search home / rommate.

  */

  async componentWillMount() {
    this.setState({ searchHome: true });
    await this.checkIfConnnected();
  }

  async checkIfConnnected() {
    const response = await fetch("/Profile");
    if (
      response.status === Constants.ACCEPT ||
      Constants.MOD === response.status
    ) {
      this.setState({ connected: true });
    } else {
      this.setState({
        redirectHome: true
      });
      this.setState({ connected: false });
    }

    this.setState({ stillLoad: false });
  }

  handleClick = () => {
    alert("fuck");
  };

  handleFilter = () => {
    this.setState({ profileOpenDialog: true });
  };

  handleToggle = () => {
    this.setState({
      profileOpenDialog: !this.state.profileOpenDialog
    });
  };

  handleLogOut = async () => {
    const response = await fetch("/LogOut");
    this.setState({
      redirectHome: true
    });
  };

  renderLogOutRedirect = () => {
    console.log("the redirect home: " + this.state.redirectHome);
    if (this.state.redirectHome) {
      return <Redirect to="/" />;
    }
  };

  render() {
    const theme = createMuiTheme({
      palette: {
        secondary: {
          main: "#fafafa"
        }
      }
    });

    if (!this.state.stillLoad) {
      return (
        <MuiThemeProvider theme={theme}>
          {this.renderLogOutRedirect()}
          <IconButton
            aria-label="upload picture"
            component="span"
            color="secondary"
            style={{ position: "absolute", top: "5%", left: "2%" }}
            onClick={this.handleFilter}
          >
            <AccountCircleOutlinedIcon fontSize="large" />
          </IconButton>

          <IconButton
            aria-label="upload picture"
            component="span"
            color="secondary"
            style={{ position: "absolute", top: "15%", left: "2%" }}
            onClick={this.handleLogOut}
          >
            <ExitToAppOutlinedIcon fontSize="large" />
          </IconButton>

          <div>
            <div
              class="row"
              style={{
                position: "absolute",
                top: "5%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                right: "20%",
                left: "20%",
                width: "60%"
              }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                {" "}
                <img alt="no pic" src="/tttt.png" width="25%" />
              </div>
              <br />

              <MenuBar
                stayle={{ width: "60%" }}
                searchHome={this.state.searchHome}
              />

              <Dialog
                open={this.state.profileOpenDialog}
                onClose={this.handleToggle}
                fullWidth
              >
                <DialogTitle id="form-dialog-title">details</DialogTitle>
                <DialogContent style={{ padding: 20 }}>
                  {this.state.searchHome ? (
                    <UploadDetailsSearchHome />
                  ) : (
                    <UploadDetailsSearchRoomie />
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </MuiThemeProvider>
      );
    } else {
      return <div> </div>;
    }
  }
}
