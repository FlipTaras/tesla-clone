import React from "react";
import classnames from "classnames";

export default ({
  title,
  paragraph,
  customClassNames,
  customParagraphClassNames,
  white,
}) => {
  const containerClassNames = classnames(
    "learnMoreTitleContainer",
    customClassNames && customClassNames
  );
  const titleClassNames = classnames(
    "learnMoreTitleContainer__title title",
    white && "learnMoreTitleContainer__title--white"
  );

  const paragraphClassNames = classnames(
    "learnMoreTitleContainer__paragraph paragraph",
    white && "learnMoreTitleContainer__paragraph--white",
    customParagraphClassNames && customParagraphClassNames
  );

  return (
    <div className={containerClassNames}>
      <h1 className={titleClassNames}>{title}</h1>
      <p className={paragraphClassNames}>{paragraph}</p>
    </div>
  );
};
