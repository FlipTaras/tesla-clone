import React from "react";
import classnames from "classnames";
export default ({ click, userStyles, fullWidth, animated, classNames }) => {
  const orderButtonClassNames = classnames(
    "orderButton",
    fullWidth && "orderButton--full",
    animated && "orderButton--animated",
    classNames && classNames
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
