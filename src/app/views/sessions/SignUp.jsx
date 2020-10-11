import React, { Component } from "react";
import {
  Card,
  Grid,
  Button
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import translate from "../../../translate";
import { connect } from "react-redux";
import GoogleLogin from 'react-google-login';

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    trans: translate
  };

  handleChange = event => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  signUp(res) {
    if (res.profileObj !== undefined) {
      let googleResponse = {
        name: res.profileObj.name,
        email: res.profileObj.email,
        token: res.googleId,
        image: res.profileObj.imageUrl,
        providerId: 'Google'
      };
    }
    console.log("iniciar sesion con google....");
  }

  handleFormSubmit = event => {
    console.log("registrando...");
  };
  render() {
    let responseGoogle = (response) => {
      console.log(response);
      this.signUp(response);
    };
    let { username, email, password, trans } = this.state;
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
                      label={trans['SignIn/Up']['username']}
                      onChange={this.handleChange}
                      type="text"
                      name="username"
                      value={username}
                      validators={["required"]}
                      errorMessages={trans['Validations']['required']}
                    />
                    <TextValidator
                      className="mb-24 w-100"
                      variant="outlined"
                      label={trans['SignIn/Up']['email']}
                      onChange={this.handleChange}
                      type="email"
                      name="email"
                      value={email}
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        trans['Validations']['required'],
                        trans['Validations']['email']
                      ]}
                    />
                    <TextValidator
                      className="mb-16 w-100"
                      label={trans['SignIn/Up']['password']}
                      variant="outlined"
                      onChange={this.handleChange}
                      name="password"
                      type="password"
                      value={password}
                      validators={["required"]}
                      errorMessages={trans['Validations']['required']}
                    />
                    <div className="flex flex-middle">
                      <Button
                        className="capitalize"
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        {trans['SignIn/Up']['signUp']}
                      </Button>
                    <span className="ml-16 mr-8">{trans['or']}</span>
                      <Button
                        className="capitalize"
                        onClick={() =>
                          this.props.history.push("/session/signin")
                        }
                      >
                        {trans['SignIn/Up']['signIn']}
                      </Button>
                    </div>
                  </ValidatorForm>
                  <div style={{margin: '10%', cursor: 'pointer'}}>
                    <GoogleLogin 
                      clientId="107447816836-mqhfrr3a9aq4nldsr4tjk0624v833fei.apps.googleusercontent.com"
                      buttonText={trans['SignIn/Up']['google']}
                      onSuccess={responseGoogle}
                      onFailure={responseGoogle} ></GoogleLogin>
                  </div>
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
