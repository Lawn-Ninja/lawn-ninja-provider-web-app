import React, { Component } from "react";
// import { Consumer } from "../context";
import TextInputGroup from "./TextInputGroup";
import axios from "axios";

import "./Form.css";

class NewProvider extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    phone_number: "",
    password: "",
    password_confirmation: "",
    errors: {}
  };

  onSubmit = event => {
    event.preventDefault();
    axios.post("http://localhost:3001/providers", {
      user: {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        address: this.state.address,
        city: this.state.address,
        state: this.state.state,
        zip_code: this.state.zip_code,
        phone_number: this.state.phone_number,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation
      }
    });

    this.props.history.replace("/login");

    const {
      first_name,
      last_name,
      email,
      address,
      city,
      state,
      zip_code,
      phone_number,
      password,
      password_confirmation
    } = this.state;

    if (first_name === "") {
      this.setState({ errors: { name: "First name is required" } });
      return;
    }

    if (last_name === "") {
      this.setState({ errors: { name: "Last name is required" } });
      return;
    }

    if (email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }

    if (address === "") {
      this.setState({ errors: { address: "Address is required" } });
      return;
    }

    if (city === "") {
      this.setState({ errors: { city: "City is required" } });
      return;
    }

    if (state === "") {
      this.setState({ errors: { state: "State is required" } });
      return;
    }

    if (zip_code === "") {
      this.setState({ errors: { zip_code: "Zip Code is required" } });
      return;
    }

    if (phone_number === "") {
      this.setState({ errors: { phone_number: "Phone Number is required" } });
      return;
    }

    if (password === "") {
      this.setState({ errors: { password: "Pasword is required" } });
      return;
    }

    if (password_confirmation === "") {
      this.setState({
        errors: { password_confirmation: "Matching password is required" }
      });
      return;
    }

    // dispatch({ type: "CREATE_USER", payload: newUser });

    this.setState({
      first_name: "",
      last_name: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zip_code: "",
      phone_number: "",
      password: "",
      password_confirmation: ""
    });
  };

  onChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  render() {
    const {
      first_name,
      last_name,
      email,
      address,
      city,
      state,
      zip_code,
      phone_number,
      password,
      password_confirmation,
      errors
    } = this.state;

    return (
      <div className="form">
        <div className="form-header">Sign Up</div>
        <div>
          <form onSubmit={this.onSubmit.bind(this)}>
            <TextInputGroup
              label="First Name"
              name="first_name"
              placeholder="Enter First Name"
              value={first_name}
              onChange={this.onChange}
              error={errors.first_name}
            />
            <TextInputGroup
              label="Last Name"
              name="last_name"
              placeholder="Enter Last Name"
              value={last_name}
              onChange={this.onChange}
              error={errors.last_name}
            />
            <TextInputGroup
              label="Address"
              name="address"
              placeholder="Enter Address"
              value={address}
              onChange={this.onChange}
              error={errors.address}
            />
            <TextInputGroup
              label="City"
              name="city"
              placeholder="Enter City"
              value={city}
              onChange={this.onChange}
              error={errors.city}
            />
            <TextInputGroup
              label="State"
              name="state"
              placeholder="Enter State"
              value={state}
              onChange={this.onChange}
              error={errors.state}
            />
            <TextInputGroup
              label="Zip Code"
              name="zip_code"
              placeholder="Enter Zip Code"
              value={zip_code}
              onChange={this.onChange}
              error={errors.zip_code}
            />
            <TextInputGroup
              label="Phone Number"
              name="phone_number"
              placeholder="Enter Phone Number"
              value={phone_number}
              onChange={this.onChange}
              error={errors.phone_number}
            />
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
            <TextInputGroup
              label="Password Confirmation"
              name="password_confirmation"
              type="password"
              placeholder="Confirm Password"
              value={password_confirmation}
              onChange={this.onChange}
              error={errors.password_confirmation}
            />
            <div>
              {/* <input type="submit" value="Create Account" className="button" /> */}
              <button type="submit" className="btn btn-success">
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>

      // </Consumer>
    );
  }

  // render() {
  //   return (
  //     <form onSubmit={this.handleSubmit}>
  //       <label>
  //         Name:
  //         <input
  //           type="text"
  //           value={this.state.value}
  //           onChange={this.handleChange}
  //         />
  //       </label>
  //       <input type="submit" value="Submit" />
  //     </form>
  //   );
  // }
}

export default NewProvider;
