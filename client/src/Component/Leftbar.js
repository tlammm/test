import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { Link, useHistory } from "react-router-dom";

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
  const [searchValue, setSearchValue] = useState("");
  const [titleData, setTitleData] = useState("");
  const history = useHistory();

  const fetchPosts = () => {
    fetch("http://localhost:5000/search", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: searchValue,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.post) {
          setTitleData("No results :(");
          return;
        }
        setTitleData(result.post.title);
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
            fetchPosts();
          }}
        >
          <InputBase
            className={classes.input}
            placeholder="Search Title"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
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

      <div>
        {titleData === "No results :(" ? (
          titleData
        ) : (
          <Link to={"/searchpage/" + titleData}>{titleData}</Link>
        )}
      </div>
    </div>
  );
}

export default Leftbar;
