import React from "react";
import classnames from "classnames";

export default ({
  disabled,
  click,
  classNames,
  customLearnMoreText,
  white,
}) => {
  const buttonClassNames = classnames(
    "learnButton",
    classNames && classNames,
    white && "learnButton--white"
  );
  return (
    <button
      disabled={disabled}
      onClick={() => click()}
      className={buttonClassNames}
    >
      <i className=" learnButton__learnicon fas fa-plus"></i>
      <span className="learnButton__learnText">
        {customLearnMoreText ? customLearnMoreText : "Learn More"}
      </span>
    </button>
  );
};
