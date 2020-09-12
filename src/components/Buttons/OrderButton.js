import React from "react";

export default ({ click, userStyles }) => {
  return (
    <button
      style={{ ...userStyles }}
      onClick={click ? () => click() : () => {}}
      className="orderButton"
    >
      Order Now
    </button>
  );
};
