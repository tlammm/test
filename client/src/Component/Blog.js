import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import "../Style/Blog.css";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Bookmark,
  BookmarkBorder,
  DeleteOutline,
  Favorite,
  FavoriteBorder,
} from "@material-ui/icons";
import M from "materialize-css";

const Blog = () => {
  const [data, setData] = useState([]);
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
  });

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
  return (
    <div className="blog">
      {data.map((item) => {
        return (
          <div className="post" key={item._id}>
            <div className="postHeader">
              <div className="authorInfo">
                <Avatar src={item.postedBy.pic} />

                <h4>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={
                      state
                        ? item.postedBy._id !== state._id
                          ? "/profile/" + item.postedBy._id
                          : "/profile"
                        : "/"
                    }
                  >
                    {item.postedBy.username}
                  </Link>
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
                {item.likes.length} {item.likes.length == 1 ? "like" : "likes"}
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
  );
};

export default Blog;
