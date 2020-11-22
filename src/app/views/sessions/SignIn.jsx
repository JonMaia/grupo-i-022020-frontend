import React, { Component } from "react";
import {
  Card,
  Grid,
  Button,
  withStyles,
  CircularProgress,
  Checkbox
} from "@material-ui/core";
//import Alert from '@material-ui/lab';
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import translate from "../../../translate";
import { loginWithEmailAndPassword } from "../../redux/actions/LoginActions";
import  AuthService   from "../api-services/AuthService.js";
import history from "history.js";
import ErrorDialog from "../Components/Dialogs/ErrorDialog";

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
    error: false,
    msg: "",
    isAdmin: false
  };

  handleChange = event => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleFormSubmit = event => {
    if (this.state.isAdmin) {
      AuthService.loginAdmin(this.state)
      .then(() => {
        history.push({
          pathname: "/home"
        
        });
      })
      .catch((error) => {
        this.setState({error: true, msg: error.response.data});
      });
    } else {
      AuthService.login(this.state)
      .then(() => {
        history.push({
          pathname: "/home" 
        });
      })
      .catch((error) => {
        this.setState({error: true, msg: error.response.data});
      });
    }
  };

  check() {
    this.setState({isAdmin: !this.state.isAdmin});
  }

  render() {
    let { mail, password, error, msg, isAdmin} = this.state;
    let { classes } = this.props;
    return (
        <div className="signup flex flex-center w-100 h-100vh">
          <div className="p-8">
            {error ? <ErrorDialog props={msg}/> : ""}
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
                      <div className="flex flex-middle mb-8">
                        <div className={classes.wrapper}>
                          <Button
                            variant="contained"
                            color="primary"
                            disabled={this.props.login.loading}
                            type="submit"
                          >
                            {translate['SignIn/Up']['signIn']}
                          </Button>
                          {this.props.login.loading && (
                            <CircularProgress
                              size={24}
                              className={classes.buttonProgress}
                            />
                          )}
                        </div>
                          <span className="ml-16 mr-8">{translate['or']}</span>
                        <Button
                          className="capitalize"
                          onClick={() =>
                            this.props.history.push("/session/signup")
                          }
                        >
                          {translate['SignIn/Up']['signUp']}
                        </Button>
                      </div>
                      <div className="flex flex-middle mb-8">
                        <span>{translate['SignIn/Up']['isAdmin']}</span>
                        <Checkbox
                          checked={isAdmin}
                          onChange={() => this.check()}
                          value="isAdmin"
                          inputProps={{
                            "aria-label": "primary checkbox"
                          }}
                        />
                      </div>
                      {/* <Button
                        className="text-primary"
                        onClick={() =>
                          this.props.history.push("/session/forgot-password")
                        }
                      >
                        {translate['SignIn/Up']['forgotPassword']}
                      </Button> */}
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