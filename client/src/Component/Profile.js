import React from "react";

function Profile() {
  return (
    <div>
      <div
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          textAlign: "center",
          margin: "20px auto",
        }}
      >
        <div>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src="https://s.starladder.com/uploads/team_logo/a/f/c/8/ad2f46c5506fe20742d84fc7f89337a5.jpg"
          />
        </div>
        <div>
          <h4>Tung Lam</h4>
          <div>
            <h4>40 Posts</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
