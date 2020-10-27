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
    customClassNames,
    customTitleClassNames,
    customTextClassNames,
    customVideoContentContainer,
    width,
    white,
    longer,
  }) => {
    const [borderPosition, setBorderPosition] = useState("0");

    const contentContainerClassNames = classnames(
      "videoButtonElement__videoButtonContentContainer",
      active && "videoButtonElement__videoButtonContentContainer--active",
      smaller && "videoButtonElement__videoButtonContentContainer--smaller",
      customVideoContentContainer && customVideoContentContainer
    );

    const videoButtonElementClassNames = classnames(
      "videoButtonElement",
      smaller && "videoButtonElement--smaller",
      longer && "videoButtonElement--longer",
      customClassNames && customClassNames
    );

    const activeBorderClassNames = classnames(
      "videoButtonElement__activeBorder",
      showTopBorder && "videoButtonElement__activeBorder--top",
      white && "videoButtonElement__activeBorder--white"
    );

    const titleClassNames = classnames(
      "videoButtonElement__videoButtonTitle",
      smaller && "videoButtonElement__videoButtonTitle--smaller",
      customTitleClassNames && customTitleClassNames,
      white && "videoButtonElement__videoButtonTitle--white",
      longer && "videoButtonElement__videoButtonTitle--longer"
    );

    const topBorderClassNames = classnames(
      "videoButtonElement__topBorder",
      smaller && "videoButtonElement__topBorder--smaller",
      white && "videoButtonElement__topBorder--white"
    );

    const textClassNames = classnames(
      "videoButtonElement__videoButtonText",
      customTextClassNames && customTextClassNames,
      white && "videoButtonElement__videoButtonText--white",
      longer && "videoButtonElement__videoButtonText--longer"
    );

    /* Animation Functionality */
    useEffect(() => {
      switch (activeButton) {
        case 1:
          setBorderPosition("0");
          break;
        case 2:
          if (showTopBorder) {
            setBorderPosition("100%");
          } else {
            setBorderPosition("105%");
          }
          break;
        case 3:
          if (showTopBorder) {
            setBorderPosition("200%");
          } else {
            setBorderPosition("218%");
          }
          break;
        case 4:
          if (showTopBorder) {
            setBorderPosition("300%");
          } else {
            setBorderPosition("330%");
          }
          break;
        case 5:
          if (showTopBorder) {
            setBorderPosition("400%");
          } else {
            setBorderPosition("440%");
          }
          break;
        default:
          break;
      }
    }, [activeButton, width, showTopBorder]);

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
          {!showTopBorder && <div className={topBorderClassNames}></div>}
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
          {buttons && (
            <div className="videoButtonElement__videoButtonInfoContainers">
              {buttons.map((el) => (
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
          )}
        </div>
      </div>
    );
  }
);
