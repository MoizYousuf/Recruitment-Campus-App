import React, { Component } from "react";
import * as firebase from "firebase";

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      username: "",
      password: ""
    };
  }

  // Using firebase to signup easily

  signUp = () => {
      const {email, username, password} = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
              console.log(email)
            firebase
              .database()
              .ref(`users/${user.uid}/`)
              .set({
                username: username,
                email: email,
                password: password,
                uid: user.uid
              })
              .then(() => {
                user
                  .updateProfile({
                    displayName: username
                  })
                  .then(function() {
                    this.props.history.push("/");
                    console.log("update");
                  })
                  .catch(function(error) {
                    // An error happened.
                  });
              });
          } else {
            // No user is signed in.
          }
        });
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  };

  render() {
    return (
      <div className="card border-success mb-3 text-center" style={styles.card}>
        <div className="card-header bg-transparent border-success">
          <h1>Signup</h1>
        </div>
        <div className="card-body text-success">
          <div className="card-title">
            <div className="input-group input-group-lg">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-lg">
                  Username
                </span>
              </div>
              <input
                type="text"
                onChange={e => this.setState({ username: e.target.value })}
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
              />
            </div>
            <br />
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
            Already have Account{" "}
            <button
              className="btn btn-outline-primary"
              onClick={() => this.props.history.push("/")}
            >
              login
            </button>
          </p>
        </div>
        <div className="card-footer bg-transparent border-success">
          <button
            type="button"
            className="btn btn-outline-primary btn-lg btn-block"
            onClick={() => this.signUp()}
          >
            Signup
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
