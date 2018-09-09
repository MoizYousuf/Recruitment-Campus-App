import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import * as firebase from "firebase";

export default class AddJobs extends Component {
  constructor() {
    super();
    this.state = {
      experience: "1",
      education: "Matric",
      companyName: "",
      position: "",
      shift: "Morning",
      salary: "",
      timingFrom: "7:30",
      timingTo: "7:30"
    };
  }

  // submit Informations

  submitInformation = () => {
    if (
      this.state.Experience !== "" &&
      this.state.Education !== "" &&
      this.state.companyName !== "" &&
      this.state.position !== "" &&
      this.state.shift !== "" &&
      this.state.salary !== "" &&
      this.state.timingFrom !== "" &&
      this.state.timingTo !== ""
    ) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          firebase
            .database()
            .ref(`users/${user.uid}/myjobs`)
            .push(this.state)
            .then(() => {
              //   console.log("Set Informations");
              alert("Job Add");
            });
        } else {
          alert("not push");
        }
      });
    } else {
      console.log(this.state);
      alert("please fills all");
    }
  };

  render() {
    return (
      <div className="text-center" style={styles.body}>
        <div className="card" style={styles.card}>
          <div className="card-body">
            <h2 className="card-title">Job's Registrations</h2>
            <div className="card-text">
              <TextField
                onChange={e => this.setState({ companyName: e.target.value })}
                id="with-placeholder"
                label="Company Name"
                placeholder="Company Name"
                margin="normal"
              />
              <TextField
                onChange={e => this.setState({ position: e.target.value })}
                id="with-placeholder"
                label="Postion"
                placeholder="Manager"
                margin="normal"
              />
              <br />
              <FormControl>
                <InputLabel htmlFor="name-native">Education</InputLabel>
                <NativeSelect
                  value={this.state.name}
                  onChange={e => this.setState({ education: e.target.value })}
                  input={<Input name="name" id="name-native" />}
                >
                  <option value="matric">Matric</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="bachelar">Bachelar</option>
                  <option value="master">Master</option>
                </NativeSelect>
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="name-native">Experience</InputLabel>
                <NativeSelect
                  value={this.state.name}
                  onChange={e => this.setState({ experience: e.target.value })}
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
                <InputLabel htmlFor="name-native">Shift</InputLabel>
                <NativeSelect
                  value={this.state.name}
                  onChange={e => this.setState({ shift: e.target.value })}
                  input={<Input name="name" id="name-native" />}
                >
                  <option value="Morning">Morning</option>
                  <option value="Evening">Evening</option>
                </NativeSelect>
              </FormControl>
              <br />
              <TextField
                onChange={e => this.setState({ salary: e.target.value })}
                id="with-placeholder"
                label="Salary"
                placeholder="20000"
                margin="normal"
              />
              <p>
                <b>Job Timing </b>
              </p>
              <form noValidate>
                <TextField
                  id="time"
                  onChange={e => this.setState({ timingFrom: e.target.value })}
                  label="From"
                  type="time"
                  defaultValue="07:30"
                  InputLabelProps={{
                    shrink: true
                  }}
                  inputProps={{
                    step: 300 // 5 min
                  }}
                />
              </form>
              <form noValidate>
                <TextField
                  onChange={e => this.setState({ timingTo: e.target.value })}
                  id="time"
                  label="To"
                  type="time"
                  defaultValue="07:30"
                  InputLabelProps={{
                    shrink: true
                  }}
                  inputProps={{
                    step: 300 // 5 min
                  }}
                />
              </form>
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
    marginLeft: "38%",
    marginTop: "8%"
  },
  card: {
    background: "rgba(255, 255, 255, 0.6    )",
    width: "24rem"
  }
};
