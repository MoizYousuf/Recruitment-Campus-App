import React, { Component } from "react";
import * as firebase from "firebase";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      username: "",
      password: ""
    };
  }

  // Using firebase to login easily

  login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.props.history.push("/home");
      });
  };

  render() {
    return (
      <div className="card border-primary mb-3 text-center" style={styles.card}>
        <div className="card-header bg-transparent border-primary">
          <h1>Login</h1>
        </div>
        <div className="card-body text-primary">
          <div className="card-title">
            <div className="input-group input-group-lg">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-lg">
                  Email
                </span>
              </div>
              <input
                type="email"
                onChange={e => this.setState({ email: e.target.value })}
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
              />
            </div>
            <br />
            <div className="input-group input-group-lg">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-lg">
                  Password
                </span>
              </div>
              <input
                type="password"
                onChange={e => this.setState({ password: e.target.value })}
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
              />
            </div>
          </div>
          <p className="card-text text-warning">
            Not have Account &nbsp;
            <button
              className="btn btn-outline-success"
              onClick={() => this.props.history.push("/signup")}
            >
              Signup
            </button>
          </p>
        </div>
        <div className="card-footer bg-transparent border-primary">
          <button
            type="button"
            className="btn btn-outline-danger btn-lg btn-block"
            onClick={() => this.login()}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}
const styles = {
  card: {
    maxWidth: "38rem",
    margin: "0 auto"
  }
};
