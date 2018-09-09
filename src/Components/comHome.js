import React, { Component } from "react";
import * as firebase from "firebase";
import Appbar from "./appbar";
import TabsToChanges from "./comTabs";

export default class ComHome extends Component {
  constructor() {
    super();
  }

  // check users login

  componentDidMount() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
      } else {
        this.props.history.push("/");
      }
    });
  }

  // logout

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.history.push("/");
      });
  };
  render() {
    return (
      <div style={styles.body}>
        <Appbar logout={() => this.logout()} />
        <TabsToChanges />
      </div>
    );
  }
}
const styles = {
  body: {
    width: "100%",
    height: "100vh",
    background: "url('https://unsplash.it/1200/800/?random')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%"
  }
};
