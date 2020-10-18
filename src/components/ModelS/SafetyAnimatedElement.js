import React from "react";
import classnames from "classnames";

export default ({
  show,
  title,
  customTitleClassNames,
  paragraph,
  elementClassNames,
  customLineClassNames,
  customDotClassNames,
  customParagraphClassNames,
}) => {
  const lineClassNames = classnames(
    "safetyAnimatedElement__line",
    show && "safetyAnimatedElement__line--show",
    customLineClassNames && customLineClassNames
  );
  const dotClassNames = classnames(
    "safetyAnimatedElement__dot",
    show && "safetyAnimatedElement__dot--show",
    customDotClassNames && customDotClassNames
  );
  const titleClassNames = classnames(
    "safetyAnimatedElement__title",
    show && "safetyAnimatedElement__title--show",
    customTitleClassNames && customTitleClassNames
  );
  const textClassNames = classnames(
    "safetyAnimatedElement__paragraph",
    customParagraphClassNames && customParagraphClassNames
  );

  return (
    <div className={classnames("safetyAnimatedElement", elementClassNames)}>
      <div className={lineClassNames}></div>
      <div className={dotClassNames}></div>
      <div className="safetyAnimatedElement__infoContainer">
        <h1 className={titleClassNames}>{title}</h1>
        <p className={textClassNames}>{paragraph}</p>
      </div>
    </div>
  );
};
