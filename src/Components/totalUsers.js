import React, { Component } from "react";
import * as firebase from "firebase";

// get all users

export default class TotalUsers extends Component {
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
      });
  }
  render() {
    const totalUsers = this.state.totalUsers;
    const Convert = Object.values(totalUsers);
    let Index = 0;
    console.log(Convert);
    return (
      <div>
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th>Id</th>
              <th>Names</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {Convert.map((value, index) => {
              if (value.student) {
                {
                  Index++;
                  console.log(value.email, Index);
                }
                return (
                  <tr key={Index}>
                    <td>{Index}</td>
                    <td>{value.username}</td>
                    <td>{value.email}</td>
                  </tr>
                );
              }
            })}
            {/* <tr>
              <td>Mary</td>
              <td>Moe</td>
              <td>mary@example.com</td>
            </tr>
            <tr>
              <td>July</td>
              <td>Dooley</td>
              <td>july@example.com</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    );
  }
}
