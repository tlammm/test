import React, { useEffect, createContext, useReducer, useContext } from "react";
import "./Style/App.css";
import Blog from "./Component/Blog";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import SignUp from "./Component/SignUp";
import SignIn from "./Component/SignIn";
import Rightbar from "./Component/Rightbar";
import Leftbar from "./Component/Leftbar";
import Profile from "./Component/Profile";
import UserProfile from "./Component/UserProfile";
import { reducer, initialState } from "./reducers/userReducer";
import Venue from "./Component/Venue";
export const UserContext = createContext();

const Routing = () => {
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    }
  }, []);

  return (
    <Switch>
      {/* <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/signin">
        <SignIn />
      </Route> */}
      <Route exact path="/">
        <div className="home">
          <Leftbar />
          <Blog />
          <Rightbar />
        </div>
      </Route>
      {/* <Route path="/venue">
        <Venue />
      </Route> */}
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/signin">
        <SignIn />
      </Route>

      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>

      {/* <Route path="/profile">
        <Profile />
      </Route> */}

      {/* <Route exact path="/">
        <div className="home">
          <Leftbar />
          <Blog />
          <Rightbar />
        </div>
      </Route> */}
    </Switch>
  );
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Navbar />
        <Routing />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
