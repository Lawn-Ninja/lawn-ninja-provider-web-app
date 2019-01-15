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
      consumerButtons: null,
      userButtons: null,
      providerInfo: null,
      startInfo: null,
      endInfo: null
    };
  }

  deleteRequest = id => {
    axios
      .delete("http://localhost:3001/jobs/" + this.props.job.id)
      .then(response => {
        console.log(response.data);
      });
  };

  claimJob = id => {
    var provider_id = localStorage.getItem("user_id");
    var params = { job: { provider_id: provider_id, status: "claimed" } };
    axios
      .patch("http://localhost:3001/jobs/" + this.props.job.id, params)
      .then(response => {
        console.log(response.data);
      });
    this.buttons();
    this.info();
  };

  startJob = id => {
    var params = { job: { start_time: Date(), status: "started" } };
    axios
      .patch("http://localhost:3001/jobs/" + this.props.job.id, params)
      .then(response => {
        console.log(response.data);
      });
    this.buttons();
    this.info();
  };

  endJob = id => {
    var params = { job: { end_time: Date(), status: "completed" } };
    axios
      .patch("http://localhost:3001/jobs/" + this.props.job.id, params)
      .then(response => {
        console.log(response.data);
      });
    this.buttons();
    this.info();
  };

  buttons = id => {
    if (this.props.job.user_id === localStorage.getItem("user_id")) {
      // this job belongs to the logged in user
      if (this.props.job.status === "posted") {
        this.setState({
          userButtons: (
            <div>
              <p>
                <button className="btn btn-success" onClick={this.deleteRequest.bind(this, id)}>
                  Cancel Request
                </button>
              </p>
            </div>
          )
        });
      } else if (this.props.job.status === "claimed") {
      } else if (this.props.job.status === "started") {
      } else if (this.props.job.status === "completed") {
        this.setState({
          userButtons: (
            <div>
              <p>
                <button className="btn btn-success">View Invoice</button>
              </p>
            </div>
          )
        });
      }
    } else {
      if (this.props.job.status === "posted") {
        this.setState({
          providerButtons: (
            <div>
              <p>
                <button className="btn btn-success" onClick={this.claimJob.bind(this, id)}>
                  Claim Job
                </button>
              </p>
            </div>
          )
        });
      } else if (this.props.job.status === "claimed") {
        this.setState({
          providerButtons: (
            <div>
              <p>
                <button className="btn btn-success" onClick={this.startJob.bind(this, id)}>
                  Start Job
                </button>
              </p>
            </div>
          )
        });
      } else if (this.props.job.status === "started") {
        this.setState({
          providerButtons: (
            <div>
              <p>
                <button className="btn btn-success" onClick={this.endJob.bind(this, id)}>End Job</button>
              </p>
            </div>
          )
        });
      } else if (this.props.job.status === "completed") {
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
    }
  };

  info = () => {
    if (
      this.props.job.status === "claimed" ||
      this.props.job.status === "started" ||
      this.props.job.status === "completed"
    ) {
      this.setState({
        providerInfo: (
          <div>
            <p>Provider: {this.props.job.provider_name}</p>
          </div>
        )
      });
    }
    if (
      this.props.job.status === "started" ||
      this.props.job.status === "completed"
    ) {
      this.setState({
        startInfo: (
          <div>
            <p>Start Time: <FriendlyTime time={this.props.job.start_time} /></p>
          </div>
        )
      });
    }
    if (this.props.job.status === "completed") {
      this.setState({
        endInfo: (
          <div>
            <p>End Time: <FriendlyTime time={this.props.job.end_time} /></p>
          </div>
        )
      });
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.job !== prevProps.job) {
      this.buttons();
      this.info();
    }
  }

  render() {
    const { id, user_id, requested_time, status, user } = this.props.job;

    return (
      <div className="job-detail">
        <div className="job-detail-info">
          <div>
            <p>Requested By: {this.props.job.user_name}</p>
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
          {this.state.userButtons}
          {this.state.providerButtons}
          <button className="btn btn-success"><Link to="/my_jobs" className="hover_link">My Jobs</Link></button>
        </div>
      </div>
    );
  }
}

export default withRouter(JobDetails);
