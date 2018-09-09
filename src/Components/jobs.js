import React, { Component } from "react";
import * as firebase from "firebase";

export default class TotalJobs extends Component {
  constructor() {
    super();
    this.state = {
      totalUsers: {},
      Uid: "",
      username: ""
    };
  }

  //  Apply Jobs

  apply = (i, index) => {
    const username = this.state.username;
    console.log("function start");
    let informations;
    const totalUsers = Object.values(this.state.totalUsers);
    totalUsers.map(value => {
      console.log("map start", value);

      if (value.Uid === this.state.Uid) {
        console.log("Uid match");
        if (value.informations) {
          console.log("information found");
          informations = value.informations;
          const jobUser = Object.values(totalUsers[index].myjobs);
          const key = Object.keys(totalUsers[index].myjobs);
          if (
            jobUser[i].experience >= informations.experience &&
            jobUser[i].position === informations.skill &&
            jobUser[i].education === informations.education
          ) {
            console.log(jobUser);
            firebase
              .database()
              .ref(
                `users/${totalUsers[index].Uid}/myjobs/${key[i]}/AppliedUser/${
                  this.state.Uid
                }`
              )
              .set({
                Apply: "Applied",
                username: username
              })
              .then(() => {
                alert("apply");
              });
          } else {
            console.log("you dont apply this jobs");
          }
        }
      }
    });
  };
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
              Uid: uid,
              username: user.displayName
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
        {Convert.map((value, userIndex) => {
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
                      <button
                        className="btn btn-primary"
                        onClick={() => this.apply(index, userIndex)}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              );
            });
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
  }
};
