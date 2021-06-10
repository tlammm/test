import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { useHistory } from "react-router-dom";
import { Comment, Favorite } from "@material-ui/icons";

import "../Style/Profile.css";

function Profile() {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [data, setData] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [toggleState, setToggleState] = useState(1);

  useEffect(() => {
    fetch("http://localhost:5000/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => setData(result.mypost));
    fetch("http://localhost:5000/savedposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => setSavedPosts(result.posts));
  }, []);

  const toggleTab = (index) => {
    setToggleState(index);
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
            <div>
              <img
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "80px",
                }}
                src={state ? state.pic : "loading"}
              />
            </div>
            <div>
              <h1>{state ? state.username : "loading"}</h1>
              <div>
                <h4>{data.length} Posts</h4>
              </div>
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
                        <h5>{item.postedBy.username}</h5>
                        <div className="postContent">
                          <h6>{item.title}</h6>
                          <p>{item.body}</p>
                          {item.comments.map((record) => {
                            return (
                              <h6 key={record._id}>
                                <span>{record.postedBy.username}: </span>
                                {record.text}
                              </h6>
                            );
                          })}
                          <Favorite style={{ color: "red" }} />
                          <input type="text" placeholder="Write a comment" />
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
                        <h5>{item.postedBy.username}</h5>
                        <div className="postContent">
                          <h6>{item.title}</h6>
                          <p>{item.body}</p>
                          {item.comments.map((record) => {
                            return (
                              <h6 key={record._id}>
                                <span>{record.postedBy.username}: </span>
                                {record.text}
                              </h6>
                            );
                          })}
                          <Favorite style={{ color: "red" }} />
                          <input type="text" placeholder="Write a comment" />
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
