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
    showTopBorder,
    click,
    active,
    activeButton,
    subtitleMiles,
    smaller,
    noBorder,
  }) => {
    const [borderPosition, setBorderPosition] = useState("0");

    const contentContainerClassNames = classnames(
      "videoButtonElement__videoButtonContentContainer",
      active && "videoButtonElement__videoButtonContentContainer--active"
    );

    const videoButtonElementClassNames = classnames(
      "videoButtonElement",
      smaller && "videoButtonElement--smaller"
    );

    const activeBorderClassNames = classnames(
      "videoButtonElement__activeBorder",
      showTopBorder && "videoButtonElement__activeBorder--top"
    );

    /* Animation Functionality */

    useEffect(() => {
      switch (activeButton) {
        case 1:
          setBorderPosition("0");
          break;
        case 2:
          setBorderPosition("105%");
          break;
        case 3:
          setBorderPosition("210%");
          break;
        case 4:
          setBorderPosition("330%");
          break;
        case 5:
          setBorderPosition("435%");
          break;
        default:
          setBorderPosition("0");
          break;
      }
    }, [activeButton]);

    /* Final Render */
    return (
      <div onClick={click} className={videoButtonElementClassNames}>
        {showBorder && (
          <div
            style={{ left: borderPosition }}
            className={activeBorderClassNames}
          ></div>
        )}
        <div className={contentContainerClassNames}>
          {!noBorder && <div className="videoButtonElement__topBorder"></div>}
          <h1 className="videoButtonElement__videoButtonTitle">{title}</h1>
          {subtitleMiles && (
            <div className="videoButtonElement__subtitleMilesContainer">
              <h1 className="videoButtonElement__videoButtonSubtitle">
                {subtitleMiles}
              </h1>
              <span className="videoButtonElement__milesSpan">miles</span>
            </div>
          )}
          {text && (
            <p className="videoButtonElement__videoButtonText">{text}</p>
          )}
          <div className="videoButtonElement__videoButtonInfoContainers">
            {buttons &&
              buttons.map((el) => (
                <div
                  key={el.buttonTitle}
                  className="videoButtonElement__videoButtonInfoInner"
                >
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
