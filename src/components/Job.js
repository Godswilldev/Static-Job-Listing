import React, { Component } from "react";
import uuid from "uuid/v4";
import Jobs from "./data";
export default class Job extends Component {
  state = {
    Jobs: Jobs,
    filters: [],
  };

  currentJobCopy = this.state.Jobs.slice();
  currentFilterCopy = this.state.filters.slice();

  applyFilter = (filterValue) => {
    console.log(this.currentJobCopy);
    !this.state.filters.find(
      (fil) => fil.toLowerCase() === filterValue.toLowerCase()
    ) &&
      this.setState((curState) => ({
        filters: [...curState.filters, filterValue],
      }));

    this.setState({
      Jobs: this.currentJobCopy.filter((job) => {
        if (job.role.toLowerCase() === filterValue.toLowerCase()) {
          return job.role.toLowerCase() === filterValue.toLowerCase();
        }
        if (job.level.toLowerCase() === filterValue.toLowerCase()) {
          return job.level.toLowerCase() === filterValue.toLowerCase();
        }
        if (job.languages.includes(filterValue)) {
          return job.languages.includes(filterValue);
        }
        if (job.tools.includes(filterValue)) {
          return job.tools.includes(filterValue);
        }
      }),
    });
  };

  deleteFilter = (filterValue) => {
    console.log(this.state.Jobs);
    this.setState((curState) => ({
      filters: [...curState.filters.filter((job) => job !== filterValue)],
    }));
    this.setState({
      Jobs: this.currentJobCopy.filter((job) => {
        if (job.role.toLowerCase() !== filterValue.toLowerCase()) {
          return job.role.toLowerCase() !== filterValue.toLowerCase();
        }
        if (job.level.toLowerCase() === filterValue.toLowerCase()) {
          return job.level.toLowerCase() !== filterValue.toLowerCase();
        }
        if (job.languages.includes(filterValue)) {
          return !job.languages.includes(filterValue);
        }
        if (job.tools.includes(filterValue)) {
          return !job.tools.includes(filterValue);
        }
      }),
    });
  };
  reset = () => {
    this.setState({
      filters: [],
      Jobs: Jobs,
    });
  };

  render() {
    return (
      <div key={uuid()}>
        <div className="filters">
          {this.state.filters.map((f, idx) => (
            <span key={uuid()}>
              {f} <button onClick={() => this.deleteFilter(f)}>X</button>
            </span>
          ))}

          {this.state.filters.length >= 1 && (
            <button onClick={this.reset}>Clear</button>
          )}
        </div>
        {this.state.Jobs.map((job, idx) => (
          <div key={uuid()} className="job">
            <h1>{job.id}</h1>
            <img src={job.logo} alt={`${job.company} logo`} />
            <h1>{job.company}</h1>
            <h1>{job.new && "New"}</h1>
            <h1>{job.featured && "Featured"}</h1>
            <h1>{job.position}</h1>
            <h1 onClick={() => this.applyFilter(job.role)}>{job.role}</h1>
            <h1 onClick={() => this.applyFilter(job.level)}>{job.level}</h1>
            <h1>{job.postedAt}</h1>
            <h1>{job.contract}</h1>
            <h1>{job.location}</h1>
            {job.languages.map((l, idx) => (
              <h2 key={uuid()} onClick={() => this.applyFilter(l)}>
                {l}
              </h2>
            ))}
            {job.tools.map((t, idx) => (
              <h2 key={uuid()} onClick={() => this.applyFilter(t)}>
                {t}
              </h2>
            ))}
          </div>
        ))}
      </div>
    );
  }
}
