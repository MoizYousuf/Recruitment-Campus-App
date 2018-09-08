import React, { Component } from "react";
import "./App.css";
import Router from "./router";
import "./firebase";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      
        <Router />
      
    );
  }
}

export default App;
