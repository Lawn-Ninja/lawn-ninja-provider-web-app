import React, { Component } from "react";
import JobsList from "./JobsList";
import $ from "jquery";
import "./MyJobs.css";

class MyJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestedJobs: [],
      scheduledJobs: [],
      startedJobs: [],
      completedJobs: []
    };
  }

  componentDidMount() {
    let token = "Bearer " + localStorage.getItem("id_token");

    $.ajax({
      url: "http://localhost:3001/my_jobs",
      type: "GET",
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", token);
      },
      context: this, // Allows us to use this.setState inside success
      success: result => {
        this.setState({
          requestedJobs: result.jobs.requested_jobs,
          scheduledJobs: result.jobs.scheduled_jobs,
          startedJobs: result.jobs.in_progress_jobs,
          completedJobs: result.jobs.completed_jobs
        });
      }
    });
  }

  render() {
    return (
      <div className="my-jobs">
        <div className="requested">
          <JobsList title={"Requested Jobs"} jobs={this.state.requestedJobs} />
        </div>
        <div className="scheduled">
          <JobsList title={"Scheduled Jobs"} jobs={this.state.scheduledJobs} />
        </div>
        <div className="inProgress">
          <JobsList title={"Jobs In Progress"} jobs={this.state.startedJobs} />
        </div>
        <div className="completed">
          <JobsList title={"Completed Jobs"} jobs={this.state.completedJobs} />
        </div>
      </div>
    );
  }
}

export default MyJobs;
