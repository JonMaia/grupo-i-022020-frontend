import React, { Component } from "react";
import {
  Card,
  Grid,
  Button,
  withStyles,
  CircularProgress
} from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import translate from "../../../translate";
import { loginWithEmailAndPassword } from "../../redux/actions/LoginActions";
import  AuthService   from "../api-services/AuthService.js";
import  {useAdminService}   from "../api-services/service/AdminService.js";
import history from "history.js";

const { createProject } = useAdminService();

const styles = theme => ({
  wrapper: {
    position: "relative"
  },

  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

class SignIn extends Component {
  state = {
    mail: "",
    password: "",
    trans: translate
  };

  handleChange = event => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleFormSubmit = event => {
    AuthService.loginAdmin(this.state)
    .then((res) => {
      const project = {
        "idAdmin": "1",
        "name": "project prueba 2",
        "minPercentage": "50.2",
        "endDate": "2020-05-25",
        "factor": "6",
        "locationName": "san francisco solano",
        "locationProvince": "Buenoas Aires",
        "locationPopulation": 451653,
        "locationState": true
      }
      createProject(project, res.token)
      .then((res) => {
        console.log("se creo el proyecto");
        console.log(res);
      })
/*      history.push({
        pathname: "/home"
      
      });*/
    })
    .catch((error) => {

      console.log("quehayeneste error");
      console.log(error);/*
      console.log(error.response.status); 
      console.log(error.response.data);*/
    })
  };

  render() {
    let { mail, password, trans } = this.state;
    let { classes } = this.props;
    return (
        <div className="signup flex flex-center w-100 h-100vh">
          <div className="p-8">
            <Card className="signup-card position-relative y-center">
              <Grid container>
                <Grid item lg={5} md={5} sm={5} xs={12}>
                  <div className="p-32 flex flex-center flex-middle h-100">
                    <img src="/assets/images/illustrations/dreamer.svg" alt="" />
                  </div>
                </Grid>
                <Grid item lg={7} md={7} sm={7} xs={12}>
                  <div className="p-36 h-100 bg-light-gray position-relative">
                    <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
                      <TextValidator
                        className="mb-24 w-100"
                        variant="outlined"
                        label={trans['SignIn/Up']['email']}
                        onChange={this.handleChange}
                        type="email"
                        name="mail"
                        value={mail}
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
                      <div className="flex flex-middle mb-8">
                        <div className={classes.wrapper}>
                          <Button
                            variant="contained"
                            color="primary"
                            disabled={this.props.login.loading}
                            type="submit"
                          >
                            {trans['SignIn/Up']['signIn']}
                          </Button>
                          {this.props.login.loading && (
                            <CircularProgress
                              size={24}
                              className={classes.buttonProgress}
                            />
                          )}
                        </div>
                          <span className="ml-16 mr-8">{trans['or']}</span>
                        <Button
                          className="capitalize"
                          onClick={() =>
                            this.props.history.push("/session/signup")
                          }
                        >
                          {trans['SignIn/Up']['signUp']}
                        </Button>
                      </div>
                      <Button
                        className="text-primary"
                        onClick={() =>
                          this.props.history.push("/session/forgot-password")
                        }
                      >
                        {trans['SignIn/Up']['forgotPassword']}
                      </Button>
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
  loginWithEmailAndPassword: PropTypes.func.isRequired,
  login: state.login
});
export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      { loginWithEmailAndPassword }
    )(SignIn)
  )
);