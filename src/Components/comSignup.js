import React, { Component } from "react";
import * as firebase from "firebase";

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      name: "",
      password: ""
    };
  }

  // Using firebase to signup easily

  signUp = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        let uid = user.uid;
        this.setState({
          Uid: uid
        });
      }
    });

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(success => {
        this.setState({
          Uid: success.user.uid
        });
        firebase
          .database()
          .ref(`Companies/${success.user.uid}`)
          .set(this.state)
          .then(res => {
            let user = firebase.auth().currentUser;

            user
              .updateProfile({
                displayName: this.state.name
              })
              .then(() => {
                this.props.history.push("/");
                // Update successful.
              })
              .catch(function(error) {
                // An error happened.
              });
          });
      })

      .catch(function(error) {});
  };

  render() {
    return (
      <div style={styles.body}>
        <div className="card mb-3 text-center" style={styles.card}>
          <div className="card-header bg-transparent">
            <h1>Company Signup</h1>
          </div>
          <div className="card-body text-success">
            <div className="card-title">
              <div className="input-group input-group-lg">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-lg">
                    Name
                  </span>
                </div>
                <input
                  type="text"
                  onChange={e => this.setState({ name: e.target.value })}
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
            <p style={styles.bg} className="card-text text-success">
              Already have Account &nbsp;
              <button
                className="btn btn-outline-primary"
                onClick={() => this.props.history.push("/")}
              >
                login
              </button>
            </p>
            <p style={styles.bg} className="card-text text-danger">
              Students Signup &nbsp;
              <button
                className="btn btn-outline-primary"
                onClick={() => this.props.history.push("/signup")}
              >
                Click here
              </button>
            </p>
          </div>
          <div className="card-footer bg-transparent">
            <button
              type="button"
              className="btn btn-primary btn-lg btn-block"
              onClick={() => this.signUp()}
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const styles = {
  bg: {
    background: "rgba(255, 255, 255, 0.4)"
  },
  card: {
    maxWidth: "38rem",
    background: "rgba(255, 255, 255, 0.4)",
    margin: "0 auto"
  },
  body: {
    width: "100%",
    height: "100vh",
    background: "url('https://unsplash.it/1200/800/?random')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%"
  }
};
