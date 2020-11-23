import React, { Component } from "react";
import Select from "react-select";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  Button,
  Icon,
  Grid
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import history from "history.js";
import Snackbar from "@material-ui/core/Snackbar";
import translate from "../../../translate.js";
import { useLocationService } from "../api-services/service/LocationService";
import { useAdminService } from "../api-services/service/AdminService";
import { MySnackbarContentWrapper } from "../material-kit/snackbar/CustomizedSnackbar.jsx";
import AuthService from "../api-services/AuthService.js";

class CreateProject extends Component {
  state = {
    name: "",
    minPercentage: "",
    endDate: new Date(),
    location: "",
    factor: "",
    errorMessageEndDate: false,
    locations: [],
    single: null,
    create: false,
    msg: ""
  };

  handleChangeSingle(value) {
    console.log(value);
    this.setState({single: value});
  }

  componentDidMount() {
    useLocationService().findAll()
    .then((response) => {
      this.setState({locations: response.data.map(location => ({
        value: location,
        label: location.name
      }))});
      console.log(this.state.locations);
    })
    .catch((error) => console.log(error));
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });

    ValidatorForm.addValidationRule("validateString", value => {
        let illegalChars = /^[a-zA-Z0-9 ]+$/;
        return illegalChars.test(value);
    });

    ValidatorForm.addValidationRule("validatePercentage", value => {
        return value > 0 && value <= 100;
    });

    ValidatorForm.addValidationRule("validateFactor", value => {
        return value >= 0 && value <= 100000;
    });
  }

  componentWillUnmount() {
    // remove rule when it is not needed
    ValidatorForm.removeValidationRule("isPasswordMatch");
  }

  handleSubmit = event => {
    event.preventDefault();
    const project = {
      idAdmin: AuthService.getCurrentUser().id,
      endDate: this.state.endDate,
      factor: this.state.factor,
      locationName: this.state.single.value.name,
      idLocation: this.state.single.value.id,
      minPercentage: this.state.minPercentage,
      name: this.state.name
    }
    console.log(project);
    console.log(AuthService.getCurrentUser());
    this.setState({create: true, msg: translate['Dialog']['create']});
    setTimeout(100000);
    useAdminService().createProject(project)
    .then((response) => { 
      history.push({
        pathname: "/home"
      
      });
    }).catch((error) => {
      console.log(error);
    });
  };

  handleChange = event => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleDateChange = date => {
    this.state.errorMessageEndDate = date < new Date();
    console.log(date < new Date());
    if (!this.state.errorMessageEndDate) {
        this.setState({ endDate: date });
    }
  };

  handleClose = () => {
    this.setState({create: false});
  }

  render() {
    let {
      name,
      minPercentage,
      endDate,
      factor,
      errorMessageEndDate,
      single,
      locations,
      create,
      msg
    } = this.state;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={create}
          autoHideDuration={6000}
          onClose={() => this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={() => this.handleClose}
            variant="success"
            message={msg}
          />
        </Snackbar>
        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => null}
        >
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Select
                className="mb-16 w-100"
                inputId="react-select-single"
                options={locations}
                value={single}
                placeholder={translate['Titles']['locations']}
                defaultValue={locations[0]}
                defaultInputValue={locations[0]}
                onChange={(value) => this.handleChangeSingle(value)}
              />

              <TextValidator
                className="mb-16 w-100"
                label={translate['Tables']['projectName']+translate['Validations']['minLength4']}
                onChange={this.handleChange}
                type="text"
                name="name"
                value={name}
                validators={[
                  "required",
                  "validateString",
                  "minStringLength: 4"
                ]}
                errorMessages={["this field is required", "allow letters, numbers, and underscores"]}
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  className="mb-16 w-100"
                  margin="none"
                  id="mui-pickers-date"
                  label={translate['Titles']['endDate']}
                  inputVariant="standard"
                  type="text"
                  autoOk={false}
                  value={endDate}
                  onChange={this.handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                /> 
              </MuiPickersUtilsProvider>
              <div>
              {errorMessageEndDate ? <label style={{color: "red"}}>{"the date has to be from the current day"}</label> :
                  <label></label>
                }
                </div>
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                className="mb-16 w-100"
                label={translate['Titles']['factor']}
                onChange={this.handleChange}
                type="number"
                name="factor"
                value={factor}
                validators={["validateFactor"]}
                errorMessages={["accepted values between 0 and 100000"]}
              />
              <TextValidator
                className="mb-16 w-100"
                label={translate['Titles']['minPercentage']}
                onChange={this.handleChange}
                type="number"
                name="minPercentage"
                value={minPercentage}
                validators={[
                  "required",
                  "validatePercentage",
                  "minStringLength:1",
                  "maxStringLength:3"
                ]}
                errorMessages={["this field is required", "accepted values between 1 and 100"]}
              />
            </Grid>
          </Grid>
          <Button color="primary" variant="contained" type="submit" onClick={this.handleSubmit}>
            <Icon>send</Icon>
              <span className="pl-8 capitalize">{translate['Titles']['createProject']}</span>
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default CreateProject;
