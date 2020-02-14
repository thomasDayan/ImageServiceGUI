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

export class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      connected: true,
      open: false,
      redirect: false,
      city: "",
      ages: [15, 100],
      cleanPerson: 0,
      cleanCare: 0,
      ownPet: false,
      carePet: false,
      smoking: false
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

  handleChangeSmoke = name => (e, value) => {
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

  render() {
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
          <Grid item xs={12}>
            Choose location : &nbsp;&nbsp;&nbsp;
            <FormControl style={{ width: "30%", top: "-45%" }}>
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
          <Typography>Care about cleaning ? 1 to 5</Typography>
          <Slider
            defaultValue={0}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={5}
            style={{ width: "95%" }}
          />

          <Grid item xs={6}>
            <div>
              <Typography style={{ top: "80%" }}>
                Care about living with pet ?{" "}
              </Typography>
              <RadioGroup
                aria-label="gender"
                name="caresmoke"
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

          <Grid item xs={6}>
            <div>
              <Typography style={{ top: "80%" }}>
                Care about smoking ?{" "}
              </Typography>
              <RadioGroup
                aria-label="gender"
                name="carePet"
                row
                // value={value}
                onChange={this.handleChangePet("smoking")}
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

          <Typography id="range-slider" gutterBottom>
            Range of ages :
          </Typography>
          <Slider
            defaultValue={[15, 100]}
            value={this.state.ages}
            onChange={this.handleChangeAges()}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            //getAriaValueText="auto"
            min={15}
            max={100}
            style={{ width: "95%" }}
          />
          <Button variant="contained" color="primary" style={{ width: "95%" }}>
            Search
          </Button>
        </Grid>
      </form>
    );
  }
}

export default Filter;
