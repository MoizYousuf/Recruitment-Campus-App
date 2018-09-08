import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import  Home  from "./Components/Home";
import  Login  from "./Components/login";
import SignUp from "./Components/signup";
import Home from "./Components/home"
import ComSignUp from "./Components/comSignup"

const Routes = () => (
    <Router>
        <div>
      <Route path="/signup" component={SignUp} />
      <Route exact path="/" component={Login} />
      <Route path="/home" component={Home} />
      <Route path="/comsignup" component={ComSignUp} />
      </div>
  </Router>
)
export default Routes;
