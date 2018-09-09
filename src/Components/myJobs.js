import React, { Component } from "react";
import * as firebase from "firebase";

export default class MyJobs extends Component {
  constructor() {
    super();
    this.state = {
      totalUsers: {}
    };
  }
  componentWillMount() {
    firebase
      .database()
      .ref(`users/`)
      .on("value", snapshot => {
        this.setState({
          totalUsers: snapshot.val()
        });
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            let uid = user.uid;
            this.setState({
              Uid: uid
            });
          }
        });
      });
  }
  render() {
    const totalUsers = this.state.totalUsers;
    const Convert = Object.values(totalUsers);
    return (
      <div style={styles.body}>
        {Convert.map(value => {
          if (value.Uid === this.state.Uid) {
            if (value.myjobs) {
              const Myjob = Object.values(value.myjobs);
              console.log(Myjob);
              return Myjob.map((value, index) => {
                console.log(value);
                return (
                  <div
                    key={index}
                    className="card card-primary"
                    style={styles.card}
                  >
                    <div className="card-body">
                      <h2 className="card-title">{value.companyName}</h2>
                      <h4 className="card-subtitle mb-2 text-muted">
                        {value.position}
                      </h4>
                      <div className="card-text">
                        <p>
                          Experience: <b>{value.experience}</b>
                        </p>
                        <p>
                          Shift: <b>{value.shift}</b>
                        </p>
                        <p>
                          Salary: <b>{value.salary}</b>
                        </p>
                        <p>
                          Timig From: <b>{value.timingFrom}</b>
                        </p>
                        <p>
                          Timing To: <b>{value.timingTo}</b>
                        </p>
                        <div style={styles.usersApplied} />
                      </div>
                    </div>
                  </div>
                );
              });
            }
          }
        })}
      </div>
    );
  }
}
const styles = {
  card: {
    width: "20%",
    textAlign: "center",
    background: "rgba(255,255,255, 0.8)",
    marginLeft: "2%"
  },
  body: {
    display: "flex",
    justifyContent: "center"
  },
  usersApplied: {
    height: "10vh",
    overFlowY: "auto"
  }
};
