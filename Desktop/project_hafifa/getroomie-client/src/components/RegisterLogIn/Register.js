import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import * as CONST from "../Constants";
import { Redirect } from "react-router-dom";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      birthYear: 0,
      password: "",
      email: "",
      errUserName: "",
      errBirthYear: "",
      errPassword: "",
      errEmail: "",
      redirect: false,
      fullNmae: ""
    };
  }

  userNameOnChange = name => async ({ target: { value } }) => {
    let exist = false;

    const response = await fetch("/Register/" + value);
    if (response.status == CONST.ACCEPT) {
      exist = true;
      this.setState({ errUserName: "username exists", userName: value });
    }
    if (value.length == 0) {
      this.setState({ errUserName: "", userName: value });
    } else if (value.length < 3) {
      this.setState({
        errUserName: "username too short",
        userName: value
      });
    } else if (exist) {
      this.setState({ errUserName: "user name exists", userName: value });
    } else {
      this.setState({ errUserName: "", userName: value });
    }
  };

  passwordOnChange = name => ({ target: { value } }) => {
    if (value.length == 0) {
      this.setState({ errPassword: "", password: value });
    } else if (value.length < 3) {
      this.setState({
        errPassword: "Password contain 3 characters",
        password: value
      });
    } else {
      this.setState({ errPassword: "", password: value });
    }
  };

  birthYearOnChange = name => ({ target: { value } }) => {
    if (value.length == 0) {
      this.setState({ errBirthYear: "", birthYear: value });
    } else if (value < 1940 || value > 2018) {
      this.setState({ errBirthYear: "Invalid year", birthYear: value });
    } else {
      this.setState({ errBirthYear: "", birthYear: value });
    }
  };

  emailOnChange = name => ({ target: { value } }) => {
    if (value.length == 0) {
      this.setState({ errEmail: "", email: value });
    } else if (value.length < 3) {
      this.setState({ errEmail: "Invalid email", email: value });
    } else {
      this.setState({ errEmail: "", email: value });
    }
  };

  fullNameOnChange = name => ({ target: { value } }) => {
    this.setState({ fullNmae: value });
  };

  checkErrors = () => {
    if (
      !this.state.errBirthYear &&
      !this.state.errEmail &&
      this.state.birthYear > 0 &&
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.userName.length > 0
    ) {
      return true;
    }
    return false;
  };

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

  handleSubmit = async () => {
    if (this.checkErrors()) {
      const response = await fetch("/Register", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          id: this.state.userName,
          userName: this.state.fullNmae,
          password: this.state.password,
          email: this.state.email,
          birthYear: this.state.birthYear
        })
      });

      if (response.status == CONST.ACCEPT) {
        this.setRedirect();
      }
    } else {
      alert("Invalid values");
    }
  };

  render() {
    return (
      <div style={{ width: "70%", height: "100%" }}>
        Register
        <br />
        <form padding={20}>
          <Grid container spacing={1}>
            <Grid item xs={8} sm={5}>
              <TextField
                id="standard-basic"
                label={
                  this.state.errUserName.length > 0
                    ? this.state.errUserName
                    : "User name"
                }
                size="small"
                margin="normal"
                error={this.state.errUserName.length > 0 ? true : false}
                onChange={this.userNameOnChange()}
                value={this.userName}
              />
            </Grid>
            <Grid item xs={8} sm={5}>
              <TextField
                label="Birth year"
                size="small"
                margin="normal"
                type="number"
                onChange={this.birthYearOnChange()}
                error={this.state.errBirthYear.length > 0 ? true : false}
                value={this.birthYear}
              />
            </Grid>
            <Grid item xs={8} sm={5}>
              <TextField
                label="Password"
                size="small"
                type="password"
                error={this.state.errPassword.length > 0 ? true : false}
                onChange={this.passwordOnChange()}
                value={this.password}
              />
            </Grid>
            <Grid item xs={8} sm={5}>
              <TextField
                id="standard-basic"
                label="Email"
                size="small"
                error={this.state.errEmail.length > 0 ? true : false}
                onChange={this.emailOnChange()}
                value={this.email}
              />
            </Grid>

            <Grid item xs={8} sm={5}>
              <TextField
                id="standard-basic"
                label="Full name"
                size="small"
                error={this.state.errEmail.length > 0 ? true : false}
                onChange={this.fullNameOnChange()}
                value={this.fullNmae}
              />
            </Grid>
            <Grid item xs={8} sm={5}>
              <Button
                variant="contained"
                color="primary"
                style={{ width: "100%", top: "35%" }}
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        {this.renderRedirect()}
      </div>
    );
  }
}
