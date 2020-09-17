import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
const mapStateToProps = (state) => ({
  width: state.page.width,
});

export default connect(mapStateToProps)(
  ({
    title,
    text,
    buttons,
    showBorder,
    topBorderPosition,
    click,
    active,
    activeButton,
    width,
  }) => {
    const ContentContainerClassNames = classnames(
      "videoButtonElement__videoButtonContentContainer",
      active && "videoButtonElement__videoButtonContentContainer--active"
    );
    const [animationBorder, setAnimationBorder] = useState(null);
    const [animationElement, setAnimationElement] = useState({
      animation: "none",
    });
    useEffect(() => {
      if (activeButton === 2) {
        setAnimationBorder({
          animation: "moveBoxRight .4s ease-in-out forwards",
        });
        if (width <= 768) {
          setAnimationElement({
            animation: "moveContainerRight .4s ease-in-out forwards",
          });
        }
      } else if (activeButton === 1) {
        setAnimationBorder({
          animation: "moveBoxLeft .4s ease-in-out forwards",
        });
        if (width <= 768) {
          setAnimationElement({
            animation: "moveContainerLeft .4s ease-in-out forwards",
          });
        }
      }
    }, [activeButton, width]);
    return (
      <div
        onClick={click}
        style={{ marginRight: "2rem", ...animationElement }}
        className="videoButtonElement"
      >
        {showBorder && (
          <div
            style={{ ...animationBorder }}
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
  }
);
