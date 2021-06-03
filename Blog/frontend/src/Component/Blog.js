import React, { useEffect, useState } from "react";

import "../Style/Blog.css";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import { Comment, Favorite } from "@material-ui/icons";

const Blog = ({ image, auth_status, username }) => {
  const [questions, setQuestions] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const url = "http://localhost:5000/api/all-questions";

    axios
      .get(url, { withCredentials: true })
      .then((response) => {
        setQuestions(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="blog">
      <h1>
        {questions && (
          <div className="Questions">
            {questions.map((question) => {
              return (
                <div className="question" key={question._id}>
                  <div className="questionProfile">
                    <Avatar src={question.owner_image} />
                    <small>{question.owner}</small>
                  </div>
                  <div className="questionInfo">
                    <div className="questionContent">
                      <h4>{question.question}</h4>
                    </div>
                    <div className="questionStats">
                      <div className="likes">
                        <Favorite />
                        <p>{question.upvotes}</p>
                      </div>
                      <div className="comments">
                        <Comment />
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder="Write your comment here"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </h1>
    </div>
  );
};

export default Blog;
