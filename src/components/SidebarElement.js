import React from "react";
import classnames from "classnames";

export default ({ text, moreActive, click }) => {
  const arrowClassnames = classnames(
    "sidebar__arrow",
    moreActive && "sidebar__arrow--active"
  );
  return (
    <div
      onClick={click ? () => click() : () => {}}
      className="sidebar__element"
    >
      {text} {text === "More" && <span className={arrowClassnames}>&#62;</span>}
    </div>
  );
};
