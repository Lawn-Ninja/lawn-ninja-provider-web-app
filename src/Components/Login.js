import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TextInputGroup from "./TextInputGroup";
import axios from "axios";

import "./Form.css";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
    submitted: false
  };

  onSubmit = event => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/sessions", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        console.log(response.data);

        // testing for jwt token
        console.log("in login request");
        localStorage.setItem("id_token", response.data.jwt);
        localStorage.setItem("provider_status", response.data.provider);
        localStorage.setItem("user_id", response.data.user_id);
        this.props.history.replace("/");
        // console.log("this is after the token");
      });

    const { email, password } = this.state;

    if (email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }

    if (password === "") {
      this.setState({ errors: { password: "Password is required" } });
      return;
    }

    this.setState({
      email: "",
      password: ""
    });
  };

  onChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  render() {
    const { email, password, errors } = this.state;
    // let redirect = null;
    // if (this.state.submitted) {
    //   redirect = <Redirect to="/jobs" />;
    // }
    return (
      // <div className="card mb-3">
      <div className="form">
        <div className="form-header">Login</div>
        <div>
          <form onSubmit={this.onSubmit.bind(this)}>
            <TextInputGroup
              label="Email"
              name="email"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={this.onChange}
              error={errors.email}
            />
            <TextInputGroup
              label="Password"
              name="password"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={this.onChange}
              error={errors.password}
            />
            {/* <input type="submit" value="Login" className="button" /> */}
            <button type="submit" className="btn btn-success">Login</button>
          </form>
        </div>
      </div>
    );
  }
}
export default withRouter(Login);
