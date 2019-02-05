import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./JobDetails.css";
import axios from "axios";
import FriendlyTime from "./FriendlyTime";

class JobDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      providerButtons: null,
      estimatedPrice: null,
      location: null,
      providerInfo: null,
      startInfo: null,
      endInfo: null,
    };
  }

  deleteRequest = id => {
    axios
      .delete("http://localhost:3001/jobs/" + this.props.job.id)
      .then(response => {
        console.log(response.data);
      });
  };

  updateJob = job => {
    this.buttons(job);
    this.info(job);
  };

  claimJob = id => {
    var provider_id = localStorage.getItem("user_id");
    // console.log(provider_id);
    var params = { job: { provider_id: provider_id, status: "claimed" } };
    axios
      .patch("http://localhost:3001/jobs/" + this.props.job.id, params)
      .then(response => {
        console.log(response.data);
        this.updateJob(response.data);
      });
  };

  startJob = id => {
    var params = { job: { start_time: Date(), status: "started" } };
    axios
      .patch("http://localhost:3001/jobs/" + this.props.job.id, params)
      .then(response => {
        console.log(response.data);
        this.updateJob(response.data);
      });
  };

  endJob = id => {
    var params = { job: { end_time: Date(), status: "completed" } };
    axios
      .patch("http://localhost:3001/jobs/" + this.props.job.id, params)
      .then(response => {
        console.log(response.data);
        this.updateJob(response.data);
      });
  };

  buttons = job => {
    console.log(job);
    if (job.status === "posted") {
      this.setState({
        providerButtons: (
          <div>
            <p>
              <button className="btn btn-success" onClick={this.claimJob.bind(this)}>
                Claim Job
              </button>
            </p>
          </div>
        )
      });
    } else if (job.status === "claimed") {
      this.setState({
        providerButtons: (
          <div>
            <p>
              <button className="btn btn-success" onClick={this.startJob.bind(this)}>
                Start Job
              </button>
            </p>
          </div>
        )
      });
    } else if (job.status === "started") {
      this.setState({
        providerButtons: (
          <div>
            <p>
              <button className="btn btn-success" onClick={this.endJob.bind(this)}>End Job</button>
            </p>
          </div>
        )
      });
    } else if (job.status === "completed") {
      this.setState({
        providerButtons: (
          <div>
            <p>
              <button className="btn btn-success">View Invoice</button>
            </p>
          </div>
        )
      });
    }
  };

  info = job => {
    this.setState({
      location: (
        <div>
          <p>Posted By: {this.props.job.consumer.first_name}</p>
          <p>Zip Code: {this.props.job.consumer.zip_code}</p>
        </div>
      )
    })
    if (
      job.status === "posted" ||
      job.status === "claimed" ||
      job.status === "started"
    ) {
      this.setState({
        estimatedPrice: (
          <div>
            <p>Estimated Price: $10</p>
          </div>
        )
      });
    }
    if (
      job.status === "claimed" ||
      job.status === "started" ||
      job.status === "completed"
    ) {
      this.setState({
        providerInfo: (
          <div>
            <p>Provider: {job.provider_name}</p>
          </div>
        ),
        location: (
          <div>
            <p>Posted By: {this.props.job.consumer.first_name} {this.props.job.consumer.last_name}</p>
            <p>Address: {this.props.job.consumer.address}</p>
            <p>City: {this.props.job.consumer.city}</p>
            <p>State: {this.props.job.consumer.state}</p>
            <p>Zip Code: {this.props.job.consumer.zip_code}</p>
          </div>
        )
      });
    }
    if (
      job.status === "started" ||
      job.status === "completed"
    ) {
      this.setState({
        startInfo: (
          <div>
            <p>Start Time: <FriendlyTime time={job.start_time} /></p>
          </div>
        )
      });
    }
    if (job.status === "completed") {
      this.setState({
        endInfo: (
          <div>
            <p>End Time: <FriendlyTime time={job.end_time} /></p>
          </div>
        )
      });
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.job !== prevProps.job) {
      this.buttons(this.props.job);
      this.info(this.props.job);
    }
  }

  render() {
    const { id, consumer_id, requested_time, status, consumer } = this.props.job;

    return (
      <div className="job-detail">
        <div className="job-detail-info">
          <div>
            <p>Requested By: {this.props.job.consumer_name}</p>
          </div>
          <div>
            <p>Requested Time: <FriendlyTime time={requested_time} /></p>
          </div>
          <div>
            <p>Status: {status}</p>
          </div>
          {this.state.providerInfo}
          {this.state.startInfo}
          {this.state.endInfo}
          Job Number: {id}
        </div>
        <div>
          {this.state.providerButtons}
          <button className="btn btn-success"><Link to="/my_jobs" className="hover_link">My Jobs</Link></button>
        </div>
      </div>
    );
  }
}

export default withRouter(JobDetails);
