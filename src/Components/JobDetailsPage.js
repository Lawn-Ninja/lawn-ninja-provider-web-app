import React, { Component } from "react";
import $ from "jquery";
import JobDetails from "./JobDetails";
import "./JobDetails.css";

class JobDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job: {}
    };
  }

  componentDidMount() {
    let token = "Bearer " + localStorage.getItem("id_token");
    let requestUrl = "http://localhost:3001/jobs/" + this.props.match.params.id;

    $.ajax({
      url: requestUrl,
      type: "GET",
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", token);
      },
      context: this,
      success: result => {
        console.log('just made a web request');
        this.setState({
          job: result
        });
        console.log(result.job);
      }
    });
  }

  render() {
    return (
      <div className="job-detail-header">
        <p>Job Details</p>
        <JobDetails job={this.state.job} />
      </div>
    );
  }
}

export default JobDetailsPage;
