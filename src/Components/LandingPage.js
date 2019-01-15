import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import NewJob from "./NewJob";

import "../App.css";
import "./LandingPage.css";

class landingPage extends Component {
  constructor() {
    super();
    this.state = {
      // userButtons: null,
      providerButtons: null
    };
  }

  buttons = () => {
    if (localStorage.getItem("id_token") !== "undefined") {
      this.setState({
        userButtons: (
          <div>
            <p>
              <button className="btn btn-success">
                <Link to="/my_jobs" className="hover_link">
                  My Jobs
                </Link>
              </button>
            </p>
            <p>
              <button className="btn btn-success">
                <Link to="/jobs" className="hover_link">
                  Jobs Near Me
                </Link>
              </button>
            </p>
            <p>
              <button className="btn btn-success">Pricing & Info</button>
            </p>
          </div>
        )
      });
    } else {
      this.setState({
        userButtons: (
          <div>
            <p>
              <button className="btn btn-success">
                {/* <Link to="/login" className="hover_link"> */}
                <Link to="/login" className="hover_link">
                  Log In
                </Link>
              </button>
            </p>
            <p>
              <button className="btn btn-success">
                <Link to="/signup" className="hover_link">
                  Sign Up
                </Link>
              </button>
            </p>
            <p>
              <button className="btn btn-success">Pricing & Info</button>
            </p>
          </div>
        )
      });
    }
  };

  componentDidMount() {
    this.buttons();
  }

  render() {
    return (
      <div className="container">
        <img src="/Lawn-Ninja.png" alt="logo" className="image"></img>
        <p className="landing-page-header">Welcome to LawnNinja!</p>
        <div className="landing-page-info">
          <p>Lawn mowing made easy.</p>
          <ul>
            <li>1. Post and schedule a lawn mowing job.</li>
            <li>2. Receive a notifcation when your job has been claimed by one of
              our trusted LawnNinjas.</li>
            <li>3. Meet your LawnNinja.</li>
            <li>4. Enjoy the smell of freshly cut grass without actually having to
              mow your lawn.</li>
          </ul>
        </div>
        <div>
          <span>
            {this.state.providerButtons}
          </span>
          <footer className="clear" />
        </div>
      </div>
    );
  }
}

export default landingPage;
