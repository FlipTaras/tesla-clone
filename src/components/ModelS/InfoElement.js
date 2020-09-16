import React from "react";
import classnames from "classnames";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  pageIndex: state.models.pageIndex,
  silentScrollTo: state.models.silentScrollTo,
  stopAnimation: state.models.stopAnimation,
});

export default connect(mapStateToProps)(
  ({
    title,
    style,
    svg,
    firstText,
    secondText,
    width,
    showLine,
    white,
    // stopPerfomanceAnimation,
    stopAnimation,
  }) => {
    const infoElementClassNames = classnames(
      "infoElement",
      stopAnimation && "infoElement--show"
    );
    return (
      <div
        key={title}
        style={{ ...style, width: width && width }}
        className={infoElementClassNames}
      >
        {svg && svg}
        <div className="infoElement__duration">{title}</div>
        <p className="infoElement__from">
          {firstText}
          {secondText && (
            <>
              <br /> {secondText}
            </>
          )}
        </p>
        {showLine && (
          <div
            className={
              white
                ? "infoElement__line infoElement__line--white"
                : "infoElement__line"
            }
          ></div>
        )}
      </div>
    );
  }
);
