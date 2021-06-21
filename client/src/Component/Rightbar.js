import React, { useState, useContext } from "react";
import "../Style/Rightbar.css";
import Modal from "@material-ui/core/Modal";
import { Avatar } from "@material-ui/core";
import M from "materialize-css";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../App";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "40%",
    height: "70%",
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Rightbar() {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const { state, dispatch } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem("user"));

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

  const handleClick = () => {
    if (state) {
      setOpenModal(true);
    } else {
      M.toast({ html: "Please sign in first!", classes: "red" });
    }
  };

  const bodyContent = (
    <div
      className={classes.paper}
      style={{
        top: `40%`,
        left: `50%`,
        transform: `translate(-50%, -35%)`,
      }}
    >
      <h2>Ask Question</h2>
      <div className="modalInfo">
        <Avatar className="avatar" src={user?.pic} />
        <p>{user?.username} asks:</p>
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
  );
  const render = () => {
    return (
      <div>
        <button onClick={() => handleClick()}>Ask Question</button>
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          disableBackdropClick={true}
        >
          <Fade in={openModal}>{bodyContent}</Fade>
        </Modal>
      </div>
    );
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
