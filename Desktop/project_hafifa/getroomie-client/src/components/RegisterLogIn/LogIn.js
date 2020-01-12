import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Redirect } from "react-router-dom";
import * as Constants from "../Constants";

export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      redirect: false,
      connected: false,
      errorForm: {
        errUserName: "",
        errPassword: ""
      }
    };
  }

  async componentDidMount() {
    await this.checkIfConnnected();
  }

  async checkIfConnnected() {
    const response = await fetch("/Profile");
    if (response.status === Constants.ACCEPT) {
      this.setState({ connected: true });
    } else {
      this.setState({ connected: false });
    }
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/Home" />;
    }
  };

  handleChangeUserName = name => ({ target: { value } }) => {
    this.setState({
      userName: value
    });
  };

  handleChangePassword = name => ({ target: { value } }) => {
    this.setState({
      password: value
    });
  };

  handleSubmit = async event => {
    const response = await fetch("/LogIn", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        id: this.state.userName,
        password: this.state.password
      })
    });
    if (response.status === Constants.ACCEPT) {
      this.setRedirect();
    } else {
      let errBody = await response.json();
      if (errBody.message.includes("User")) {
        this.setState({ errorForm: { errUserName: errBody, errPassword: "" } });
      } else if (errBody.message.includes("Password")) {
        this.setState({ errorForm: { errPassword: errBody, errUserName: "" } });
      }
    }
  };

  render() {
    if (this.connected) {
      this.setRedirect();
    }

    return (
      <div
        style={{
          position: "absolute",
          left: "65%",
          top: "0%",
          width: "30%",
          padding: 20
        }}
      >
        Log In
        <br />
        <form padding={20}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                id="standard-basic"
                label="User name"
                size="small"
                margin="normal"
                value={this.state.userName}
                error={
                  this.state.errorForm.errUserName.length > 0 ? true : false
                }
                helperText={this.state.errorForm.errUserName}
                onChange={this.handleChangeUserName()}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Password"
                size="small"
                type="password"
                value={this.state.password}
                error={
                  this.state.errorForm.errPassword.length > 0 ? true : false
                }
                helperText={this.state.errorForm.errPassword}
                onChange={this.handleChangePassword()}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="#fafafa"
                style={{ width: "85%", top: "35%" }}
                onClick={this.handleSubmit}
              >
                Log In
              </Button>
            </Grid>
          </Grid>

          <br />
          <br />
        </form>
        {this.renderRedirect()}
      </div>
    );
  }
}
