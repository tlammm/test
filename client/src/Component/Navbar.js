import React from "react";
import "../Style/Navbar.css";
import { useHistory } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { Dropdown } from "react-bootstrap";
import axios from "axios";

function Navbar({ image, auth_status, username }) {
  const history = useHistory();

  const goToBlog = () => {
    history.push("/");
  };

  const goToVenue = () => {
    history.push("/venue");
  }

  const Logout = async () => {
    localStorage.clear();

    history.push("/user-signin");
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
        <div className="navPage" onClick={goToVenue}>Venue</div>
      </div>
      <div className="navLogin">
        {!auth_status ? (
          <button
            onClick={() => {
              history.push("/signin");
            }}
          >
            Login
          </button>
        ) : (
          <div className="userProfile">Hey</div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
