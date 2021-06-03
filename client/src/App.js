import React, { useEffect, useState } from "react";
import "./Style/App.css";
import Blog from "./Component/Blog";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import SignUp from "./Component/SignUp";
import SignIn from "./Component/SignIn";
import axios from "axios";
import Rightbar from "./Component/Rightbar";
import Leftbar from "./Component/Leftbar";
import Profile from "./Component/Profile";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/">
          <div className="home">
            <Leftbar />
            <Blog />
            <Rightbar />
          </div>
        </Route>
      </Switch>
      <Route path="/profile">
        <Profile />
      </Route>
    </Router>
  );
}

export default App;
