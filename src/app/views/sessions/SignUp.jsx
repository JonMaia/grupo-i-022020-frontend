import React, { Component } from "react";
import {
  Card,
  Grid,
  Button
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import translate from "../../../translate";
import { connect } from "react-redux";
import  AuthService   from "../api-services/AuthService.js";
import history from "history.js";

class SignUp extends Component {
  state = {
    name: "",
    mail: "",
    password: "",
    nickname: "",
    error: false,
    msg: ""
  };

  handleChange = event => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleFormSubmit = event => {
    AuthService.register(this.state)
    .then(() => {
      history.push({
        pathname: "/session/signin"
      
      });
    }).catch((error) => {
      console.log(error.response.data);
      this.setState({error: true, msg: error.response.data});
    });
  };
  render() {
    let { name, mail, password, nickname } = this.state;
    return (
      <div className="signup flex flex-center w-100 h-100vh">
        <div className="p-8">
          <Card className="signup-card position-relative y-center">
            <Grid container>
              <Grid item lg={5} md={5} sm={5} xs={12}>
                <div className="p-32 flex flex-center bg-light-gray flex-middle h-100">
                  <img
                    src="/assets/images/illustrations/posting_photo.svg"
                    alt=""
                  />
                </div>
              </Grid>
              <Grid item lg={7} md={7} sm={7} xs={12}>
                <div className="p-36 h-100">
                  <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
                    <TextValidator
                      className="mb-24 w-100"
                      variant="outlined"
                      label={translate['SignIn/Up']['username']}
                      onChange={this.handleChange}
                      type="text"
                      name="name"
                      value={name}
                      validators={["required"]}
                      errorMessages={translate['Validations']['required']}
                    />
                    <TextValidator
                      className="mb-24 w-100"
                      variant="outlined"
                      label={translate['SignIn/Up']['nickname']}
                      onChange={this.handleChange}
                      type="text"
                      name="nickname"
                      value={nickname}
                      validators={["required"]}
                      errorMessages={translate['Validations']['required']}
                    />
                    <TextValidator
                      className="mb-24 w-100"
                      variant="outlined"
                      label={translate['SignIn/Up']['email']}
                      onChange={this.handleChange}
                      type="email"
                      name="mail"
                      value={mail}
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        translate['Validations']['required'],
                        translate['Validations']['email']
                      ]}
                    />
                    <TextValidator
                      className="mb-16 w-100"
                      label={translate['SignIn/Up']['password']}
                      variant="outlined"
                      onChange={this.handleChange}
                      name="password"
                      type="password"
                      value={password}
                      validators={["required"]}
                      errorMessages={translate['Validations']['required']}
                    />
                    <div className="flex flex-middle">
                      <Button
                        className="capitalize"
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        {translate['SignIn/Up']['signUp']}
                      </Button>
                    <span className="ml-16 mr-8">{translate['or']}</span>
                      <Button
                        className="capitalize"
                        onClick={() =>
                          this.props.history.push("/session/signin")
                        }
                      >
                        {translate['SignIn/Up']['signIn']}
                      </Button>
                    </div>
                  </ValidatorForm>
                </div>
              </Grid>
            </Grid>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // setUser: PropTypes.func.isRequired
});

export default connect(
  mapStateToProps,
  {}
)(SignUp);
