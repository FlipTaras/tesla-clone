import React, { useState } from "react";
import classnames from "classnames";

export default ({ click, close }) => {
  const [toolTipClassNames, setToolTipClassNames] = useState(
    "closeNextButton__text"
  );
  const changeTooltipClassName = () => {
    if (toolTipClassNames === "closeNextButton__text") {
      console.log("here");
      setToolTipClassNames(
        classnames("closeNextButton__text closeNextButton__text--hover")
      );
    } else {
      setToolTipClassNames("closeNextButton__text");
    }
  };
  return (
    <div
      onMouseEnter={() => changeTooltipClassName()}
      onMouseLeave={() => changeTooltipClassName()}
      className="closeNextButton__container"
    >
      <button
        className={
          close
            ? "closeNextButton closeNextButton--close"
            : "closeNextButton closeNextButton--next"
        }
        onClick={click}
      >
        {close ? (
          <i className="closeNextButton__icon fas fa-times"></i>
        ) : (
          <i className="closeNextButton__icon closeNextButton__icon--next fas fa-angle-down"></i>
        )}
      </button>

      <span onClick={click} className={toolTipClassNames}>
        {close ? "Close" : "Next"}
      </span>
    </div>
  );
};
