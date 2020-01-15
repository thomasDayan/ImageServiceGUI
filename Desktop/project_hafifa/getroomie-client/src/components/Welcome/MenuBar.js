import React, { Fragment, Component } from "react";
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
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Filter from "../Filter/Filter";
import FilterApartment from "../Filter/FilterApartment";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Redirect } from "react-router-dom";
import * as Constants from "../Constants";
import Messages from "../Messages/Messages";
export default class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      filterOpenDialog: false,
      messageOpenDialog: false
    };
  }

  handleFilter = () => {
    this.setState({ filterOpenDialog: true });
  };

  handleToggle = () => {
    this.setState({
      filterOpenDialog: !this.state.filterOpenDialog
    });
  };

  handleFilterMessages = () => {
    this.setState({ messageOpenDialog: true });
  };

  handleToggleMessage = () => {
    this.setState({
      messageOpenDialog: !this.state.messageOpenDialog
    });
  };

  render() {
    const { filterOpenDialog } = this.state;

    const theme = createMuiTheme({
      palette: {
        secondary: {
          main: "#fafafa"
        }
      }
    });

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <ButtonGroup
            variant="contained"
            theme={theme}
            color="secondary"
            fullWidth
            style={{
              backgroundColor: "#fafafa"
            }}
            aria-label="full width outlined button group"
          >
            <Button onClick={this.handleToggle}>Filter</Button>
            <Button onClick={this.handleToggleMessage}>Messages</Button>
            <Button>Likes</Button>
          </ButtonGroup>
        </MuiThemeProvider>
        <Dialog open={filterOpenDialog} onClose={this.handleToggle} fullWidth>
          <DialogTitle id="form-dialog-title">Filter</DialogTitle>
          <DialogContent style={{ padding: 20 }}>
            {this.props.searchHome ? <Filter /> : <FilterApartment />}
          </DialogContent>
        </Dialog>

        <Dialog
          open={this.state.messageOpenDialog}
          onClose={this.handleToggleMessage}
          fullWidth
        >
          <DialogTitle id="form-dialog-title">Messages</DialogTitle>
          <DialogContent style={{ padding: 10 }}>
            <Messages />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
