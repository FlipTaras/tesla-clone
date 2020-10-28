import React, { useState } from "react";
import classnames from "classnames";

export default ({ click, close, white }) => {
  const [toolTipClassNames, setToolTipClassNames] = useState(
    "closeNextButton__text"
  );

  const changeTooltipClassName = () => {
    setToolTipClassNames(
      classnames(
        "closeNextButton__text",
        white && "closeNextButton__text--white",
        toolTipClassNames === "closeNextButton__text" &&
          "closeNextButton__text--hover"
      )
    );
  };

  const CloseNextButtonClassNames = classnames(
    "closeNextButton",
    close ? "closeNextButton--close" : "closeNextButton--next",
    white && "closeNextButton--white"
  );

  const ContainerClassNames = classnames(
    "closeNextButton__container",
    white && "closeNextButton__container--white"
  );

  return (
    <div
      onMouseEnter={() => changeTooltipClassName()}
      onMouseLeave={() => changeTooltipClassName()}
      className={ContainerClassNames}
    >
      <button className={CloseNextButtonClassNames} onClick={click}>
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
