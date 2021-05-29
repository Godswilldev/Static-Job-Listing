import React, { Component } from "react";
import Jobs from "./data";
export default class Job extends Component {
  state = {
    Jobs: Jobs,
  };
  render() {
    return (
      <div>
        {this.state.Jobs.map((job) => (
          <div key={job.id} className="job">
            <h1>{job.id}</h1>
            <img src={job.logo} alt={`${job.company} logo`} />
            <h1>{job.company}</h1>
            <h1>{job.new && "New"}</h1>
            <h1>{job.featured && "Featured"}</h1>
            <h1>{job.position}</h1>
            <h1>{job.role}</h1>
            <h1>{job.level}</h1>
            <h1>{job.postedAt}</h1>
            <h1>{job.contract}</h1>
            <h1>{job.location}</h1>
            {job.languages.map((l) => (
              <h2>{l}</h2>
            ))}
            {job.tools.map((t) => (
              <h2>{t}</h2>
            ))}
          </div>
        ))}
      </div>
    );
  }
}
