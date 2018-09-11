import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import * as firebase from "firebase";

export default class UpdateInformation extends Component {
  constructor() {
    super();
    this.state = {
      skills: "",
      Experience: "1",
      Education: "matric"
    };
  }

  // submit Informations

  submitInformation = () => {
    if (
      this.state.skills !== "" &&
      this.state.Experience !== "" &&
      this.state.Education !== ""
    ) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          firebase
            .database()
            .ref(`users/${user.uid}/informations`)
            .set({
              skill: this.state.skills,
              experience: this.state.Experience,
              education: this.state.Education
            })
            .then(() => {
              console.log("Set Informations");
              alert("updated");
            });
        } else {
          console.log("nothing");
        }
      });
    }
  };

  render() {
    return (
      <div className="text-center" style={styles.body}>
        <div className="card" style={styles.card}>
          <div className="card-body">
            <h2 className="card-title">Jobs Registration</h2>
            <div className="card-text">
              <TextField
                onChange={e => this.setState({ skills: e.target.value })}
                id="with-placeholder"
                label="Skills"
                placeholder="Manager"
                margin="normal"
              />
              <FormControl>
                <InputLabel htmlFor="name-native">Experience</InputLabel>
                <NativeSelect
                  value={this.state.name}
                  onChange={e => this.setState({ Experience: e.target.value })}
                  input={<Input name="name" id="name-native" />}
                >
                  <option value="1">1 Year</option>
                  <option value="2">2 Year</option>
                  <option value="3">3 Year</option>
                  <option value="4">4 Year</option>
                  <option value="5">5 Year</option>
                </NativeSelect>
              </FormControl>
              <br />
              <FormControl>
                <InputLabel htmlFor="name-native">Education</InputLabel>
                <NativeSelect
                  value={this.state.name}
                  onChange={e => this.setState({ Education: e.target.value })}
                  input={<Input name="name" id="name-native" />}
                >
                  <option value="matric">Matric</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="bachelar">Bachelar</option>
                  <option value="master">Master</option>
                </NativeSelect>
              </FormControl>
            </div>
            <br />
            <button
              type="button"
              className="btn btn-danger btn-lg"
              onClick={() => this.submitInformation()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const styles = {
  body: {
    margin: "0 auto",
    marginTop: "8%"
  },
  card: {
    background: "rgba(255, 255, 255, 0.6    )",
    width: "24rem",
    margin: " 0 auto"
  }
};
