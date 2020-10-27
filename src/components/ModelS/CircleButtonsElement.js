import React from "react";
import classnames from "classnames";

export default ({ numberOfElement, active, white, setActive, animation }) => {
  const elementsArray = Array.from(Array(numberOfElement).keys());

  const buttonClassNames = classnames(
    "circleButtonElement__button",
    white && "circleButtonElement__button--white"
  );

  const activeClassName = white
    ? "circleButtonElement__button--activeWhite"
    : "circleButtonElement__button--active";

  const circleClickHandler = (value) => {
    clearTimeout(animation);
    setActive(value);
  };

  return (
    <div className="circleButtonElement">
      {elementsArray.map((el, i) => (
        <div
          key={i}
          style={setActive ? { cursor: "pointer" } : { pointerEvents: "none" }}
          onClick={() => circleClickHandler(i + 1)}
          className={classnames(
            buttonClassNames,
            active === i + 1 && activeClassName
          )}
        ></div>
      ))}
    </div>
  );
};
