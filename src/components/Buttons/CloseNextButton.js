import React, { useState } from "react";
import classnames from "classnames";

export default ({ click, close, white }) => {
  const [toolTipClassNames, setToolTipClassNames] = useState(
    "closeNextButton__text"
  );

  const changeTooltipClassName = () => {
    if (toolTipClassNames === "closeNextButton__text") {
      setToolTipClassNames(
        classnames(
          "closeNextButton__text closeNextButton__text--hover",
          white && "closeNextButton__text--white"
        )
      );
    } else {
      setToolTipClassNames(
        "closeNextButton__text",
        white && "closeNextButton__text--white"
      );
    }
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
          <i className="fas fa-times"></i>
        ) : (
          <i className="fas fa-angle-down"></i>
        )}
      </button>

      <span onClick={click} className={toolTipClassNames}>
        {close ? "Close" : "Next"}
      </span>
    </div>
  );
};
