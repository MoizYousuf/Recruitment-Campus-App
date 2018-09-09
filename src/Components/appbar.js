import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import * as firebase from "firebase";

export default class Appbar extends Component {
  constructor() {
    super();

    this.state = {
      left: false,
      Username: ""
    };
  }
  // Toggle Drawer to left
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };
  //Get Name to the firebase

  componentDidMount() {
    firebase.auth().onAuthStateChanged(
      function(user) {
        if (user) {
          this.setState({
            Username: user.displayName
          });
          console.log(user);
        } else {
          //   this.props.history.push("/");
        }
      }.bind(this)
    );
  }

  // Logout

  render() {
    const { logout } = this.props;
    const sideList = (
      <div style={styles.list}>
        <List>
          <h3>{this.state.Username}</h3>
        </List>
        <Divider />
        <List>
          <button onClick={() => logout()} className="btn btn-danger">
            Logout
          </button>
        </List>
      </div>
    );
    return (
      <div>
        <AppBar position="static" className="text-center">
          <Toolbar variant="dense">
            <IconButton
              color="inherit"
              aria-label="Menu"
              onClick={this.toggleDrawer("left", true)}
            >
              <MenuIcon />
            </IconButton>
            <div className="w-100 p-3 text-center">
              <Typography
                className="text-center"
                variant="title"
                color="inherit"
              >
                Recruitment Campus
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
          onOpen={this.toggleDrawer("left", true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("left", false)}
            onKeyDown={this.toggleDrawer("left", false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}
const styles = {
  list: {
    width: 250,
    textAlign: "center"
  },
  fullList: {
    width: "auto"
  }
};
