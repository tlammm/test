import React from "react";
import "../Style/Leftbar.css";

function Leftbar() {
  return (
    <div className="leftbar">
      <div className="leftSearch">
        <input type="text" placeholder="Search" />
      </div>
      <div className="leftTopsearch">Top hashtag:</div>
    </div>
  );
}

export default Leftbar;
