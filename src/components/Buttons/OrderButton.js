import React from "react";
import classnames from "classnames";
export default ({
  click,
  userStyles,
  fullWidth,
  animated,
  classNames,
  customText,
  disabled,
}) => {
  const orderButtonClassNames = classnames(
    "orderButton",
    fullWidth && "orderButton--full",
    animated && "orderButton--animated",
    classNames && classNames
  );
  return (
    <button
      disabled={disabled}
      style={{ ...userStyles }}
      onClick={click ? () => click() : () => {}}
      className={orderButtonClassNames}
    >
      {customText ? customText : "Order Now"}
    </button>
  );
};
