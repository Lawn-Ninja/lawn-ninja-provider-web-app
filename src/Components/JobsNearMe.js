import React, { Component } from "react";
import JobsList from "./JobsList";
import $ from 'jquery';
// import JobDetailsPage from './JobDetailsPage';

class MyJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: []
    };
  }

  componentDidMount() {
    let token = "Bearer " + localStorage.getItem("id_token");

    $.ajax({
      url: "http://localhost:3001/jobs",
      type: "GET",
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", token);
      },
      context: this, // Allows us to use this.setState inside success
      success: result => {
        this.setState({
          jobs: result
        });
      }
    });
  }

  render() {
    return (
      <div className="my-jobs">
        <JobsList title={"Jobs Near Me"} jobs={this.state.jobs} />
      </div>
    );
  }
}

export default MyJobs;
