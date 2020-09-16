import React, { useEffect, useState } from "react";
import classnames from "classnames";

export default ({
  title,
  text,
  buttons,
  showBorder,
  topBorderPosition,
  click,
  active,
  activeButton,
}) => {
  const ContentContainerClassNames = classnames(
    "videoButtonElement__videoButtonContentContainer",
    active && "videoButtonElement__videoButtonContentContainer--active"
  );
  const [animation, setAnimation] = useState(null);
  useEffect(() => {
    if (activeButton === 2) {
      setAnimation({ animation: "moveBoxRight .4s ease-in-out forwards" });
    } else if (activeButton === 1) {
      setAnimation({ animation: "moveBoxLeft .4s ease-in-out forwards" });
    }
  }, [activeButton]);

  return (
    <div
      onClick={click}
      style={{ marginRight: "2rem" }}
      className="videoButtonElement"
    >
      {showBorder && (
        <div
          style={{ ...animation }}
          className="videoButtonElement__videoButtonActiveBorder"
        ></div>
      )}
      <div className={ContentContainerClassNames}>
        <div
          style={{ ...topBorderPosition }}
          className="videoButtonElement__videoButtonContainerTopBorder"
        ></div>
        <h1 className="videoButtonElement__videoButtonTitle">{title}</h1>
        <p className="videoButtonElement__videoButtonText">{text}</p>
        <div className="videoButtonElement__videoButtonInfoContainers">
          {buttons.map((el) => (
            <div className="videoButtonElement__videoButtonInfoInner">
              <h2 className="videoButtonElement__videoButtonInfoTitle">
                {el.buttonTitle}
              </h2>
              <div className="videoButtonElement__videoButtonInfoTextContainer">
                <p className="videoButtonElement__videoButtonInfoText">
                  {el.buttonFirstText}
                </p>
                <p className="videoButtonElement__videoButtonInfoText">
                  {el.buttonSecondtext}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
