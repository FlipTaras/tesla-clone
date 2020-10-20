import React from "react";
import classnames from "classnames";

export default ({ title, paragraph, customClassNames }) => {
  const containerClassNames = classnames(
    "learnMoreTitleContainer",
    customClassNames && customClassNames
  );
  return (
    <div className={containerClassNames}>
      <h1 className="learnMoreTitleContainer__title title">{title}</h1>
      <p className="learnMoreTitleContainer__paragraph paragraph">
        {paragraph}
      </p>
    </div>
  );
};
