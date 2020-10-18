import React from "react";

export default ({ title, paragraph }) => {
  return (
    <div className="learnMoreTitleContainer">
      <h1 className="learnMoreTitleContainer__title title">{title}</h1>
      <p className="learnMoreTitleContainer__paragraph paragraph">
        {paragraph}
      </p>
    </div>
  );
};
