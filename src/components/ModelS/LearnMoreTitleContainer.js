import React from "react";
import classnames from "classnames";

export default ({
  title,
  paragraph,
  customClassNames,
  customParagraphClassNames,
}) => {
  const containerClassNames = classnames(
    "learnMoreTitleContainer",
    customClassNames && customClassNames
  );
  const paragraphClassNames = classnames(
    "learnMoreTitleContainer__paragraph paragraph",
    customParagraphClassNames
  );
  return (
    <div className={containerClassNames}>
      <h1 className="learnMoreTitleContainer__title title">{title}</h1>
      <p className={paragraphClassNames}>{paragraph}</p>
    </div>
  );
};
