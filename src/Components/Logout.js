import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import "./Form.css";

class Logout extends Component {
  postLogoutHandler = () => {
    axios.delete("http://localhost:3001/provider_logout").then(response => {
      console.log(response);
      console.log(response.data.jwt);

      this.props.history.replace("/login");

      // testing for jwt token
      console.log("in logout request");
      localStorage.setItem("id_token", response.data.jwt);
      var currentToken = localStorage.getItem("id_token");
      console.log("current token");
      console.log(currentToken);
    });
  };

  render() {
    return (
      <div className="form">
        <div className="form-header">Logout</div>
        <div>
          <p className="form-body">Are you sure you want to log out?</p>
          {/* <input
            type="submit"
            value="Logout"
            className="button"
            onClick={this.postLogoutHandler}
          /> */}
          <button type="submit" className="btn btn-success" onClick={this.postLogoutHandler}>Logout</button>
          {console.log("logging out")}
        </div>
      </div>
    );
  }
}

export default withRouter(Logout);