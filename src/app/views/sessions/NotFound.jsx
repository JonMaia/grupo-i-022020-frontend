import React, { Component } from "react";
import { Button } from "@material-ui/core";
import translate from '../../../translate';

class NotFound extends Component {
  state = {
    trans: translate
  };
  render() {
    let {trans} = this.state;
    return (
      <div className="flex flex-center flex-middle w-100 h-100vh">
        <div className="flex flex-column flex-center flex-middle" style={{ maxWidth: "320px" }}>
          <img className="mb-32" src="/assets/images/illustrations/404.svg" alt="" />
          <Button
            className="capitalize"
            variant="contained"
            color="primary"
            onClick={() => this.props.history.push("/")}
          >
            {trans['notFound']}
          </Button>
        </div>
      </div>
    );
  }
}

export default NotFound;
