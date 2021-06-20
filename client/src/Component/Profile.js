import React, { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../App";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";

import {
  Favorite,
  PhotoCamera,
  Bookmark,
  BookmarkBorder,
  DeleteOutline,
  FavoriteBorder,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import "../Style/Profile.css";
import M from "materialize-css";
import { Button } from "@material-ui/core";

function Profile() {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [data, setData] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [toggleState, setToggleState] = useState(1);
  const [image, setImage] = useState("");
  const useStyles = makeStyles(() => ({
    input: {
      display: "none",
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    fetch("http://localhost:5000/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.mypost);
      });

    fetch("http://localhost:5000/savedposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => setSavedPosts(result.posts));
  });
  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "cactus");
      data.append("cloud_name", "dxeac7lyn");
      fetch("https://api.cloudinary.com/v1_1/dxeac7lyn/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          fetch("http://localhost:5000/changepic", {
            method: "put",
            headers: {
              "Content-type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              localStorage.setItem(
                "user",
                JSON.stringify({ ...state, pic: result.pic })
              );
              dispatch({ type: "CHANGEPIC", payload: result.pic });
            });
        })
        .catch((err) => console.log(err));
    }
  }, [image]);

  console.log(data);
  const changePic = (file) => {
    setImage(file);
  };

  const toggleTab = (index) => {
    setToggleState(index);
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
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
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

  const deletePost = (postid) => {
    fetch(`http://localhost:5000/deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
        M.toast({ html: "Your post has been deleted!", classes: "green" });
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
  const render = () => {
    if (state) {
      return (
        <div>
          <div
            style={{
              width: "40%",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              textAlign: "center",
              margin: "20px auto",
              paddingBottom: "20px",
            }}
          >
            <div className="profilePic">
              <img
                style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "50%",
                  border: "2px solid black",
                }}
                src={state ? state.pic : "loading"}
              />
              <div
                className="changeProfilePic"
                style={{ marginRight: "10px", marginLeft: "10px" }}
              >
                <input
                  accept="image/*"
                  className={classes.input}
                  id="icon-button-file"
                  type="file"
                  onChange={(e) => changePic(e.target.files[0])}
                />
                <label htmlFor="icon-button-file">
                  <IconButton aria-label="upload picture" component="span">
                    <PhotoCamera />
                  </IconButton>
                </label>
              </div>
            </div>
            <div>
              <h1>{state ? state.username : "loading"}</h1>
              <h4>{data.length} Posts</h4>
              <Button
                variant="contained"
                onClick={() => history.push("/changepassword")}
              >
                Change password
              </Button>
            </div>
          </div>

          <div className="container">
            <div className="bloc-tabs">
              <button
                className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(1)}
              >
                My Posts
              </button>
              <button
                className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(2)}
              >
                Saved Posts
              </button>
            </div>
            <div className="content-tabs">
              <div
                className={
                  toggleState === 1 ? "content  active-content" : "content"
                }
              >
                <div>
                  {data.map((item) => {
                    return (
                      <div className="mypost" key={item._id}>
                        <div className="postHeader">
                          <div className="authorInfo">
                            <Avatar src={item.postedBy.pic} />
                            <h4
                              style={{
                                fontWeight: "normal",
                              }}
                            >
                              {item.postedBy.username}
                            </h4>
                          </div>

                          {state
                            ? item.postedBy._id === state._id && (
                                <DeleteOutline
                                  onClick={() => deletePost(item._id)}
                                  style={{ cursor: "pointer" }}
                                />
                              )
                            : null}
                        </div>

                        <div className="postContent">
                          <h3>{item.title}</h3>
                          <p>{item.body}</p>
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
                              {item.likes.includes(state._id) ? (
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
                              )}
                            </div>

                            <div className="saveIcon">
                              {item.saved.includes(state._id) ? (
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
                          {/* <Favorite style={{ color: "red" }} />
                          <input type="text" placeholder="Write a comment" /> */}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div
                className={
                  toggleState === 2 ? "content  active-content" : "content"
                }
              >
                <div>
                  {savedPosts.map((item) => {
                    return (
                      <div className="mypost" key={item._id}>
                        <div className="postHeader">
                          <div className="authorInfo">
                            <Avatar src={item.postedBy.pic} />
                            <h4
                              style={{
                                fontWeight: "normal",
                              }}
                            >
                              {item.postedBy.username}
                            </h4>
                          </div>

                          {state
                            ? item.postedBy._id === state._id && (
                                <DeleteOutline
                                  onClick={() => deletePost(item._id)}
                                  style={{ cursor: "pointer" }}
                                />
                              )
                            : null}
                        </div>

                        <div className="postContent">
                          <h3>{item.title}</h3>
                          <p>{item.body}</p>
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
                              {item.likes.includes(state._id) ? (
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
                              )}
                            </div>

                            <div className="saveIcon">
                              {item.saved.includes(state._id) ? (
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
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="signInFirst">
          PLEASE SIGN IN FIRST!
          <button
            onClick={() => {
              history.push("/signin");
            }}
          >
            Sign in
          </button>
        </div>
      );
    }
  };
  return <div>{render()}</div>;
}

export default Profile;
