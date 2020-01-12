import React, { Component } from "react";
import Welcome from "./components/Welcome/Welcome";
import Home from "./components/Welcome/Home";
import { Route, Switch } from "react-router-dom";
import { Redirect, Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import * as Constants from "./components/Constants";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false
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

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Welcome />} />
          <Route exact path="/Home" render={() => <Home />} />
        </Switch>
      </div>
    );
  }
}

export default App;
