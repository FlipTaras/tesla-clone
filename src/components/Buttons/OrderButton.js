import React from "react";
import classnames from "classnames";
export default ({ click, userStyles, fullWidth }) => {
  const orderButtonClassNames = classnames(
    "orderButton",
    fullWidth && "orderButton--full"
  );
  return (
    <button
      style={{ ...userStyles }}
      onClick={click ? () => click() : () => {}}
      className={orderButtonClassNames}
    >
      Order Now
    </button>
  );
};
