import React from "react";

export default ({ disabled, click }) => {
  return (
    <button disabled={disabled} onClick={() => click()} className="learnButton">
      <i className=" learnButton__learnicon fas fa-plus"></i>
      <span className="learnButton__learnText">Learn More</span>
    </button>
  );
};
