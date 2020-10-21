import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  Button,
  Icon,
  Grid,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

class CreateProject extends Component {
  state = {
    name: "",
    minPercentage: "",
    active: false,
    endDate: new Date(),
    location: "",
    factor: "",
    errorMessageEndDate: false
  };

  componentDidMount() {
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
    console.log("submitted");
    console.log(event);
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

  render() {
    let {
      name,
      minPercentage,
      active,
      endDate,
      location,
      factor,
      errorMessageEndDate
    } = this.state;
    return (
      <div>
        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => null}
        >
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                className="mb-16 w-100"
                label="Name (Min length 4)"
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
                  label="End Date"
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
              <TextValidator
                className="mb-32 w-100"
                label="Min Percentage"
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

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                className="mb-32 w-100"
                label="Factor"
                onChange={this.handleChange}
                type="number"
                name="factor"
                value={factor}
                validators={["validateFactor"]}
                errorMessages={["accepted values between 0 and 100000"]}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Active"
                value={active}
                name="active"
              />
            </Grid>
          </Grid>
          <Button color="primary" variant="contained" type="submit">
            <Icon>send</Icon>
            <span className="pl-8 capitalize">Send</span>
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default CreateProject;
