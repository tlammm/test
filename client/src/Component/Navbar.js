import React, { useContext } from "react";
import "../Style/Navbar.css";
import { useHistory } from "react-router-dom";
import { Avatar, Button } from "@material-ui/core";

import { UserContext } from "../App";

function Navbar() {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const render = () => {
    if (state) {
      return (
        <div className="userNav">
          <p
            style={{ cursor: "pointer", marginRight: "10px" }}
            onClick={() => {
              history.push("/profile");
            }}
          >
            {state.username}
          </p>

          <Button
            variant="contained"
            style={{ backgroundColor: "red", color: "white" }}
            onClick={() => Logout()}
          >
            Logout
          </Button>
        </div>
      );
    } else {
      return (
        <button
          onClick={() => {
            history.push("/signin");
          }}
        >
          Sign in
        </button>
      );
    }
  };

  const goToBlog = () => {
    history.push("/");
  };

  // const goToVenue = () => {
  //   history.push("/venue");
  // };

  const Logout = async () => {
    localStorage.clear();
    dispatch({ type: "CLEAR" });
  };

  return (
    <div className="navbar">
      <div className="navLogo">
        <h1 onClick={goToBlog}>CACTUS</h1>
      </div>
      <div className="navPages">
        <div className="navPage" onClick={goToBlog}>
          Blog
        </div>
        <div className="navPage">Stats</div>
        <div
          className="navPage"
          //  onClick={goToVenue}
        >
          Venue
        </div>
      </div>
      <div className="navLogin">{render()}</div>
    </div>
  );
}

export default Navbar;
