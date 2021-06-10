import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { useHistory, useParams } from "react-router-dom";
import { Comment, Favorite } from "@material-ui/icons";

import "../Style/UserProfile.css";

function Profile() {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
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
  }, []);

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
                  width: "160px",
                  height: "160px",
                  borderRadius: "80px",
                }}
                src={user.pic}
              />
            </div>
            <div>
              <h4>{user.name}</h4>
              <div>
                <h4>{posts.length} Posts</h4>
              </div>
            </div>
          </div>
          <div className="userPosts">
            {posts.map((item) => {
              return (
                <div className="post" key={item._id}>
                  <h5>{item.postedBy.name}</h5>
                  <div className="postContent">
                    <h6>{item.title}</h6>
                    <p>{item.body}</p>
                    {item.comments.map((record) => {
                      return (
                        <h6 key={record._id}>
                          <span>{record.postedBy.name}: </span>
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
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}
export default Profile;
