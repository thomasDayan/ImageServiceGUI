import React, { Fragment, Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Redirect } from "react-router-dom";
import * as Constants from "../Constants";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import IconButton from "@material-ui/core/IconButton";
import "./Profile";
import axios from "axios";

export class UploadDetailsSearchHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      fullName: "",
      birthYear: "",
      email: ""
    };
  }

  async componentDidMount() {
    const response = await fetch("/Profile");
    const body = await response.json();
    if (
      response.status === Constants.ACCEPT ||
      Constants.MOD === response.status
    ) {
      this.setState({
        id: body.id,
        fullName: body.userName,
        birthYear: body.birthYear
      });
    } else {
      this.setState({
        redirectHome: true
      });
      this.setState({ connected: false });
    }

    this.setState({ stillLoad: false });
  }

  render() {
    return <div>

        

    </div>;
  }
}

export default UploadDetailsSearchHome;
