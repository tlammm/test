import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { Link, useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import { UserContext } from "../App";

import "../Style/Leftbar.css";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "96.5%",
    height: 30,
    background: "white",
    marginBottom: "10px",
    border: "1px solid gray",
  },
  input: {
    marginLeft: theme.spacing(1),
    fontSize: "15px",
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

function Leftbar() {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const { state, dispatch } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState([]);

  const fetchUsers = (query) => {
    setSearch(query);
    fetch("http://localhost:5000/searchuser", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setUserDetails(result.user);
      });
  };
  return (
    <div className="leftbar">
      <div className="leftSearch">
        <Paper
          component="form"
          className={classes.root}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <InputBase
            className={classes.input}
            placeholder="Search User"
            value={search}
            onChange={(e) => fetchUsers(e.target.value)}
            // inputProps={{ "aria-label": "search title" }}
          />
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
      <div className="userLists">
        {search === "" ? null : (
          <div>
            {userDetails.map((item) => {
              return (
                <div className="userComponents">
                  <Avatar
                    src={item.pic}
                    style={{
                      width: "40px",
                      height: "40px",
                      // marginLeft: "-30%",
                    }}
                  />
                  <div className="usernames">
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "black",
                        fontWeight: "normal",
                      }}
                      to={
                        state
                          ? item?._id !== state._id
                            ? "/profile/" + item?._id
                            : "/profile"
                          : "/"
                      }
                    >
                      {item.username}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Leftbar;
