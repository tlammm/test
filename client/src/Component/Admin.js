import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import {
  Bookmark,
  BookmarkBorder,
  DeleteOutline,
  Favorite,
  FavoriteBorder,
  Delete,
} from "@material-ui/icons";
import M from "materialize-css";
import Avatar from "@material-ui/core/Avatar";
import "../Style/Blog.css";
import { UserContext } from "../App";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 700,
    margin: "auto",
    marginTop: "1%",
  },
  root2: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "80%",
    height: 30,
    background: "white",
    margin: "auto",
    marginBottom: "20px",
    borderRadius: "18px",
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

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const [userDetails, setUserDetails] = useState([]);

  const [value, setValue] = React.useState(0);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:5000/allposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
      });
    fetch("http://localhost:5000/allusers", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUsers(result.users);
      });
  }, []);

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
  const likePost = (id) => {
    fetch("http://localhost:5000/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      });
  };
  const unLikePost = (id) => {
    fetch("http://localhost:5000/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      });
  };

  const comment = (text, postId) => {
    fetch("http://localhost:5000/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.error) {
          M.toast({ html: result.error, classes: "red" });
        }
      })
      .catch((err) => console.log(err));
  };

  const deletePostAdmin = (postid) => {
    fetch(`http://localhost:5000/deletepostadmin/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
        M.toast({ html: "Post has been deleted!", classes: "green" });
      });
  };

  const savePost = (id) => {
    fetch("http://localhost:5000/save", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
        M.toast({ html: "Saved succesfully!", classes: "green" });
      });
  };
  const unSavePost = (id) => {
    fetch("http://localhost:5000/unsave", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      });
  };

  const deleteUser = (userid) => {
    fetch(`http://localhost:5000/deleteuser/${userid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        M.toast({ html: "This user has been deleted", classes: "green" });
        window.location.reload();
      });
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const allUsers = () => {
    return (
      <div className="userList">
        {users.map((item) => {
          return (
            <div className="userComponent">
              <div className="user">
                <Avatar
                  src={item.pic}
                  style={{ width: "50px", height: "50px" }}
                />
                <div className="username">
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
              <Delete
                style={{
                  cursor: "pointer",
                  marginRight: "20px",
                  color: "gray",
                }}
                onClick={() => deleteUser(item._id)}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Users" {...a11yProps(1)} />
          <Tab label="Posts" {...a11yProps(0)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <div className="leftSearch">
            <Paper
              component="form"
              className={classes.root2}
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
          <div>
            {search === "" ? (
              allUsers()
            ) : (
              <div>
                {userDetails.map((item) => {
                  return (
                    <div className="userComponent">
                      <div className="user">
                        <Avatar
                          src={item.pic}
                          style={{ width: "50px", height: "50px" }}
                        />
                        <div className="username">
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
                      <Delete
                        style={{
                          cursor: "pointer",
                          marginRight: "20px",
                          color: "gray",
                        }}
                        onClick={() => deleteUser(item._id)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <div className="blog">
            {data.map((item) => {
              return (
                <div className="post" key={item._id} style={{ width: "300%" }}>
                  <div className="postHeader">
                    <div className="authorInfo">
                      <Avatar src={item?.postedBy.pic} />

                      <h4>
                        <Link
                          style={{
                            textDecoration: "none",
                            color: "black",
                            fontWeight: "normal",
                          }}
                          to={
                            state
                              ? item?.postedBy._id !== state._id
                                ? "/profile/" + item?.postedBy._id
                                : "/profile"
                              : "/"
                          }
                        >
                          {item?.postedBy.username}
                        </Link>
                      </h4>
                    </div>

                    <DeleteOutline
                      onClick={() => deletePostAdmin(item._id)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>

                  <div className="postContent">
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    {/* <img src={item.pic ? item.pic : null} /> */}
                    {item.comments.map((record) => {
                      return (
                        <p key={record._id} className="comments">
                          <span style={{ fontWeight: "bolder" }}>
                            {record.postedBy.username}{" "}
                          </span>
                          {record.text}
                        </p>
                      );
                    })}
                    <div className="postIcon">
                      <div className="likeIcon">
                        {state ? (
                          item.likes.includes(state._id) ? (
                            <Favorite
                              style={{ color: "red", marginTop: "20px" }}
                              onClick={() => unLikePost(item._id)}
                            />
                          ) : (
                            <FavoriteBorder
                              style={{
                                color: "black",
                                marginTop: "20px",
                              }}
                              onClick={() => likePost(item._id)}
                            />
                          )
                        ) : (
                          <FavoriteBorder
                            style={{
                              color: "black",
                              marginTop: "20px",
                            }}
                            onClick={() =>
                              M.toast({
                                html: "You must be signed in",
                                classes: "red",
                              })
                            }
                          />
                        )}
                      </div>

                      <div className="saveIcon">
                        {state ? (
                          item.saved.includes(state._id) ? (
                            <Bookmark
                              style={{ color: "blue", marginTop: "20px" }}
                              onClick={() => unSavePost(item._id)}
                            />
                          ) : (
                            <BookmarkBorder
                              style={{
                                color: "black",
                                marginTop: "20px",
                              }}
                              onClick={() => savePost(item._id)}
                            />
                          )
                        ) : (
                          <BookmarkBorder
                            style={{
                              color: "black",
                              marginTop: "20px",
                            }}
                            onClick={() =>
                              M.toast({
                                html: "You must be signed in",
                                classes: "red",
                              })
                            }
                          />
                        )}
                      </div>
                    </div>
                    <h5 style={{ marginTop: "6px" }}>
                      {item.likes.length}{" "}
                      {item.likes.length == 1 ? "like" : "likes"}
                    </h5>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (e.target[0].value !== "") {
                          comment(e.target[0].value, item._id);
                          e.target[0].value = "";
                        }
                      }}
                    >
                      <input type="text" placeholder="Write a comment" />
                    </form>
                  </div>
                </div>
              );
            })}
          </div>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
