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
    customClassNames,
    customTitleClassNames,
    customTextClassNames,
    width,
  }) => {
    const [borderPosition, setBorderPosition] = useState("0");

    const contentContainerClassNames = classnames(
      "videoButtonElement__videoButtonContentContainer",
      active && "videoButtonElement__videoButtonContentContainer--active"
    );

    const videoButtonElementClassNames = classnames(
      "videoButtonElement",
      smaller && "videoButtonElement--smaller",
      customClassNames && customClassNames
    );

    const activeBorderClassNames = classnames(
      "videoButtonElement__activeBorder",
      showTopBorder && "videoButtonElement__activeBorder--top"
    );

    const titleClassNames = classnames(
      "videoButtonElement__videoButtonTitle",
      smaller && "videoButtonElement__videoButtonTitle--smaller",
      customTitleClassNames && customTitleClassNames
    );

    const topBorderClassNames = classnames(
      "videoButtonElement__topBorder",
      smaller && "videoButtonElement__topBorder--smaller"
    );

    const textClassNames = classnames(
      "videoButtonElement__videoButtonText",
      customTextClassNames && customTextClassNames
    );

    /* Animation Functionality */
    useEffect(() => {
      switch (activeButton) {
        case 1:
          setBorderPosition("0");
          break;
        case 2:
          if (width <= 600) {
            setBorderPosition("109%");
          } else {
            setBorderPosition("105%");
          }
          break;
        case 3:
          if (width <= 600) {
            setBorderPosition("220%");
          } else {
            setBorderPosition("218%");
          }
          break;
        case 4:
          if (width <= 600) {
            setBorderPosition("338%");
          } else {
            setBorderPosition("330%");
          }
          break;
        case 5:
          if (width <= 600) {
            setBorderPosition("452%");
          } else if (width <= 800) {
            setBorderPosition("443%");
          } else {
            setBorderPosition("440%");
          }
          break;
        default:
          setBorderPosition("0");
          break;
      }
    }, [activeButton, width]);

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
          {!noBorder && <div className={topBorderClassNames}></div>}
          <h1 className={titleClassNames}>{title}</h1>
          {subtitleMiles && (
            <div className="videoButtonElement__subtitleMilesContainer">
              <h1 className="videoButtonElement__videoButtonSubtitle">
                {subtitleMiles}
              </h1>
              <span className="videoButtonElement__milesSpan">miles</span>
            </div>
          )}
          {text && <p className={textClassNames}>{text}</p>}
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
