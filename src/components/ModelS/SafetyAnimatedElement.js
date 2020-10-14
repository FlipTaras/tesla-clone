import React from "react";
import classnames from "classnames";

export default ({
  show,
  title,
  customTitleClassNames,
  text,
  textAnimation,
  elementClassNames,
  customLineClassNames,
  customDotClassNames,
}) => {
  const lineClassNames = classnames(
    "safetyAnimatedElement__line",
    show && "safetyAnimatedElement__line--show",
    customLineClassNames
  );
  const dotClassNames = classnames(
    "safetyAnimatedElement__dot",
    show && "safetyAnimatedElement__dot--show",
    customDotClassNames
  );
  const titleClassNames = classnames(
    "safetyAnimatedElement__title",
    show && "safetyAnimatedElement__title--show",
    customTitleClassNames
  );
  return (
    <div className={classnames("safetyAnimatedElement", elementClassNames)}>
      <div className={lineClassNames}></div>
      <div className={dotClassNames}></div>
      <div className="safetyAnimatedElement__infoContainer">
        <h1 className={titleClassNames}>{title}</h1>
        <p
          style={{ animation: textAnimation }}
          className="safetyAnimatedElement__text"
        >
          {text}
        </p>
      </div>
    </div>
  );
};
