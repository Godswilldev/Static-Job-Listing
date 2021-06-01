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
      <div className="job">
        <div
          className={
            this.state.filters.length >= 1 ? "job__filters" : undefined
          }
        >
          <div>
            {this.state.filters.map((f) => (
              <span className="job__filters--name" key={uuid()}>
                {f}
                <button
                  className="job__filters--btn"
                  onClick={() => this.deleteFilter(f)}
                >
                  X
                </button>
              </span>
            ))}
          </div>
          <div>
            {this.state.filters.length >= 1 && (
              <button className="job__filters--clear" onClick={this.reset}>
                Clear
              </button>
            )}
          </div>
        </div>

        <div>
          {this.state.Jobs.map((job) => (
            <div key={uuid()} className="job__list">
              <div className="job__list--left">
                <img
                  className="job__list--left---img"
                  src={job.logo}
                  alt={`${job.company} logo`}
                />
                <div className="job__list--left---infos">
                  <div className="job__list--left---infos---type">
                    <h3 className="job__list--company">{job.company}</h3>
                    <h3 className={job.new ? "job__list--new" : undefined}>
                      {job.new && "New"}
                    </h3>
                    <h3
                      className={
                        job.featured ? "job__list--featured" : undefined
                      }
                    >
                      {job.featured && "Featured"}
                    </h3>
                  </div>

                  <h3 className="job__list--position">{job.position}</h3>

                  <div className="job__list--left---infos---type">
                    <p className="job__list--postedAt">{job.postedAt} </p>
                    <p className="job__list--contract">{job.contract}</p>
                    <p className="job__list--location">{job.location}</p>
                  </div>
                </div>
              </div>

              <div className="job__list--right">
                <h2
                  className="job__list--role right"
                  onClick={() => this.applyFilter(job.role)}
                >
                  {job.role}
                </h2>
                <h3
                  className="job__list--level right"
                  onClick={() => this.applyFilter(job.level)}
                >
                  {job.level}
                </h3>
                {job.languages.map((l, idx) => (
                  <h2
                    className="job__list--languages right"
                    key={uuid()}
                    onClick={() => this.applyFilter(l)}
                  >
                    {l}
                  </h2>
                ))}
                {job.tools.map((t) => (
                  <h2
                    className="job__list--tools right"
                    key={uuid()}
                    onClick={() => this.applyFilter(t)}
                  >
                    {t}
                  </h2>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
