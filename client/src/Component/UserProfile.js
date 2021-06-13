import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { useParams } from "react-router-dom";
import {
  Favorite,
  PhotoCamera,
  Bookmark,
  BookmarkBorder,
  DeleteOutline,
  FavoriteBorder,
} from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import M from "materialize-css";

import "../Style/UserProfile.css";

function Profile() {
  const { state, dispatch } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);

  const { userid } = useParams();
  console.log(userid);

  useEffect(() => {
    fetch(`http://localhost:5000/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPosts(result.posts);
        setUser(result.user);
      });
    console.log(user);
    console.log(posts);
  }, []);

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
        const newPost = posts.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setPosts(newPost);
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
        const newPost = posts.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setPosts(newPost);
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
        const newPost = posts.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setPosts(newPost);
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
        const newPost = posts.filter((item) => {
          return item._id !== result._id;
        });
        setPosts(newPost);
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
        const newPost = posts.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setPosts(newPost);
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
        const newPost = posts.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setPosts(newPost);
      });
  };
  return (
    <>
      {posts ? (
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
              borderBottom: "1px solid black",
            }}
          >
            <div>
              <img
                style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "50%",
                  border: "2px solid black",
                }}
                src={user.pic}
              />
            </div>
            <div>
              <h1>{user.username}</h1>
              <div>
                <h4>{posts.length} Posts</h4>
              </div>
            </div>
          </div>
          <div className="userPosts">
            {posts.map((item) => {
              return (
                <div className="post" key={item._id}>
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
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}
export default Profile;
