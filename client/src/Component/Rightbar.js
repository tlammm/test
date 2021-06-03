import React, { useState } from "react";
import "../Style/Rightbar.css";
import Modal from "react-modal";
import { Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Rightbar({ image, auth_status, username }) {
  const [openModal, setOpenModal] = useState(false);
  const [question, setQuestion] = useState("");

  const history = useHistory();

  const askQuestion = (auth_status) => {
    console.log(auth_status);
    if (auth_status) {
      setOpenModal(true);
    } else {
      history.push("/signin");
    }
  };

  const postQuestion = async () => {
    const form_data = new FormData();
    form_data.append("question", question);

    const url = "http://localhost:5000/api/ask-question";

    try {
      const response = await axios.post(url, form_data, {
        withCredentials: true,
      });

      alert(response.data.msg);
      setOpenModal(false);
    } catch (error) {
      alert(error.response.data.msg);
    }

    setQuestion("");
  };
  return (
    <div className="rightbar">
      <p>If you have any questions, please let us know</p>
      <button onClick={() => askQuestion(auth_status)}>Ask Question</button>
      <img src="https://cdn.xlreporting.com/web/work-chat.png" alt="" />
      <Modal
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        shouldCloseOnOverlayClick={false}
        style={{
          overlay: {
            width: 700,
            height: 670,
            backgroundColor: "rgba(0,0,0,0.8)",
            zIndex: "1000",
            top: "50%",
            left: "50%",
            marginTop: "-300px",
            marginLeft: "-350px",
            borderRadius: "10px",
          },
        }}
      >
        <div className="modalTitle">
          <h5>Ask Question</h5>
          <div className="modalInfo">
            <Avatar className="avatar" src={image} />
            <p>{username} asks:</p>
          </div>
          <div className="modalField">
            <textarea
              type="text"
              placeholder="Start your question with 'What', 'How', 'Why', etc"
              onChange={(e) => setQuestion(e.target.value)}
              value={question}
              rows="8"
              cols="50"
            />
          </div>

          <div className="modalBtn">
            <button onClick={() => setOpenModal(false)} className="cancel">
              Cancel
            </button>
            <button className="add" onClick={postQuestion}>
              Add Question
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Rightbar;
