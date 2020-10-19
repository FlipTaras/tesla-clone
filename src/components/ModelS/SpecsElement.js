import React from "react";

export default ({ title, subtitle }) => {
  return (
    <div className="specsElement">
      <h1 className="specsElement__title">{title}</h1>
      <span className="specsElement__subtitle">{subtitle}</span>
    </div>
  );
};
