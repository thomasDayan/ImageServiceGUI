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
import "./Welcome.css";
import Divider from "@material-ui/core/Divider";
import { Redirect } from "react-router-dom";
import * as Constants from "../Constants";

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false
    };
  }

  async componentDidMount() {
    this.setState({ searchHome: true });
    await this.checkIfConnnected();
    if (!this.connected) {
      this.setState({
        redirectHome: true
      });
    }
  }

  async checkIfConnnected() {
    const response = await fetch("/Profile");
    if (response.status === Constants.ACCEPT) {
      this.setState({ connected: true });
    } else {
      this.setState({ connected: false });
    }
  }

  renderHomeRedirect = () => {
    if (this.state.connected) {
      return <Redirect to="/Home" />;
    }
  };

  render() {
    return (
      <div>
        <div
          style={{
            position: "absolute",
            top: "5%",
            left: "42%",
            right: "42%",
            width: "16%"
          }}
        >
          <img alt="no pic" src="/tttt.png" width="100%" />
        </div>
        <form
          style={{
            backgroundColor: "#fafafa",
            borderRadius: 7,
            position: "absolute",
            top: "35%",
            height: "35%",
            right: "25%",
            left: "25%",
            width: "50%",
            padding: 20
          }}
        >
          <Register />
          &nbsp;&nbsp;
          <Divider
            orientation="vertical"
            style={{
              position: "absolute",
              left: "60%",
              top: "5%",
              height: "90%"
            }}
          />
          &nbsp;&nbsp;
          <LogIn
            style={{
              position: "absolute",
              left: "70%",
              top: "0%",
              height: "100%"
            }}
          />
        </form>
        {this.renderHomeRedirect()}
      </div>
    );
  }
}
