import React, { Component } from "react";
import Job from "./components/Job";

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="header"></div>
        <Job />
      </div>
    );
  }
}

export default App;
