import React from "react";
import classnames from "classnames";

export default ({ disabled, click, classNames }) => {
  const buttonClassNames = classnames("learnButton", classNames && classNames);
  return (
    <button
      disabled={disabled}
      onClick={() => click()}
      className={buttonClassNames}
    >
      <i className=" learnButton__learnicon fas fa-plus"></i>
      <span className="learnButton__learnText">Learn More</span>
    </button>
  );
};
