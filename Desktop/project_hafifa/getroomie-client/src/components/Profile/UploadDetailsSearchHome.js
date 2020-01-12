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
      browse: false,
      file: null,
      error: "",
      connected: true,
      open: false,
      redirect: false,
      city: "",
      ages: [15, 100],
      cleanPerson: 0,
      cleanCare: 0,
      ownPet: false,
      carePet: false
    };
  }

  handleChangeCity = name => ({ target: { value } }) => {
    this.setState({ city: value });
  };

  handleChangeCleanPerson = name => (e, value) => {
    this.setState({ cleanPerson: value });
  };

  handleChangeCleanCaring = name => (e, value) => {
    this.setState({ cleanCare: value });
  };

  handleChangeAges = name => (e, value) => {
    this.setState({ ages: value });
  };

  handleChangePet = name => (e, value) => {
    if (value === "yes") {
      this.setState({ [name]: true });
    } else {
      this.setState({ [name]: false });
    }
  };

  componentDidMount() {
    this.handleToggle();
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

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };

  handleFile(e) {
    let file = e.target.files[0];
    this.setState({ file: file, disable: false, browse: true });
  }

  async handleUpload() {
    if (!this.state.browse) {
      return;
    }
    let file = this.state.file;
    let formdata = new FormData();
    formdata.append("philip", file);
    formdata.append("name", "philip");
    axios({
      url: "http://localhost:4000/ProfilePicture",
      method: "POST",
      data: formdata
    });
    const response = await fetch("/Settings/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        id: parseInt(this.props.id),
        profilePic: file.name
      })
    });
    this.setState({
      picture: file.name,
      browse: true
    });
  }

  handleSubmit = () => {
    this.handleUpload();
  };

  render() {
    //cities should get from a define list in constants.
    const cities = ["Tel Aviv", "Petha Tikva"];

    const { open, error } = this.state;

    const theme = createMuiTheme({
      palette: {
        secondary: {
          main: "#fafafa"
        }
      }
    });

    return (
      <form padding={20}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            Choose location : &nbsp;&nbsp;&nbsp;
            <FormControl style={{ width: "40%", top: "-45%" }}>
              <InputLabel id="demo-simple-select-label">City</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.city}
                onChange={this.handleChangeCity()}
              >
                {cities.map(city => {
                  return <MenuItem value={city}>{city}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <Typography>Upload a picture .. </Typography>
          </Grid>
          <Grid item xs={3}>
            <input
              accept="image/*"
              id="icon-button-file"
              type="file"
              style={{ display: "none" }}
              onChange={e => this.handleFile(e)}
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                style={{ top: "-20%" }}
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </Grid>
          <Typography>Consider yourself as OCD person ? 1 to 5</Typography>
          <Slider
            defaultValue={0}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={5}
            style={{ width: "95%" }}
            onChange={this.handleChangeCleanPerson()}
          />

          <Grid item xs={12}>
            <div>
              <Typography style={{ top: "80%" }}>Got a pet ?</Typography>
              <RadioGroup
                aria-label="gender"
                name="carePet"
                row
                // value={value}
                onChange={this.handleChangePet("carePet")}
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio color="primary" />}
                  label="yes"
                  labelPlacement="start"
                  style={{ top: "-25%" }}
                />
                <FormControlLabel
                  value="no"
                  control={<Radio color="primary" />}
                  label="no"
                  labelPlacement="start"
                />
              </RadioGroup>
            </div>
          </Grid>
          <Button variant="contained" color="primary" style={{ width: "95%" }}>
            Update Details
          </Button>
        </Grid>
      </form>
    );
  }
}

export default UploadDetailsSearchHome;
