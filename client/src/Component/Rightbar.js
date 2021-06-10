import React, { useState, useContext } from "react";
import "../Style/Rightbar.css";
import Modal from "react-modal";
import { Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import M from "materialize-css";
import { UserContext } from "../App";

function Rightbar() {
  const [openModal, setOpenModal] = useState(false);
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
  const render = () => {
    if (state) {
      return (
        <div>
          <button onClick={() => setOpenModal(true)}>Ask Question</button>
          <Modal
            isOpen={openModal}
            onRequestClose={() => setOpenModal(false)}
            shouldCloseOnOverlayClick={false}
            style={{
              overlay: {
                width: "40%",
                height: "87%",
                backgroundColor: "rgba(0,0,0,0.8)",
                top: "44%",
                left: "50%",
                marginTop: "-17%",
                marginLeft: "-22%",
                borderRadius: "10px",
              },
            }}
          >
            <div className="modal">
              <h5>Ask Question</h5>
              <div className="modalInfo">
                <Avatar className="avatar" src={user.pic} />
                <p>{user.username} asks:</p>
              </div>

              <div className="modalField">
                <input
                  type="text"
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
                <textarea
                  type="text"
                  placeholder="Start your question with 'What', 'How', 'Why', etc"
                  onChange={(e) => setBody(e.target.value)}
                  value={body}
                  rows="8"
                  cols="50"
                />
              </div>

              <div className="modalBtn">
                <button onClick={() => setOpenModal(false)} className="cancel">
                  Cancel
                </button>
                <button className="add" onClick={AddPost}>
                  Add Question
                </button>
              </div>
            </div>
          </Modal>
        </div>
      );
    } else {
      return (
        <button
          onClick={() => {
            history.push("/signin");
          }}
        >
          Sign In
        </button>
      );
    }
  };

  const AddPost = () => {
    fetch("http://localhost:5000/createpost", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        body,
        title,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: "red" });
        } else {
          M.toast({
            html: "Your question has been added successfully",
            classes: "green",
          });
          setOpenModal(false);
          setBody("");
          setTitle("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="rightbar">
      <p>If you have any questions, please let us know</p>
      {render()}

      <img src="https://cdn.xlreporting.com/web/work-chat.png" alt="" />
    </div>
  );
}

export default Rightbar;
