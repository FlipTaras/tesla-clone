import React from "react";
import classnames from "classnames";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  pageIndex: state.models.pageIndex,
  silentScrollTo: state.models.silentScrollTo,
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
    showSection,
    smaller,
    learnMoreOn,
    customInfoElementClassNames,
  }) => {
    const infoElementClassNames = classnames(
      "infoElement",
      showSection && "infoElement--show",
      smaller && "infoElement--smaller",
      learnMoreOn && "infoElement--animationOff",
      customInfoElementClassNames
    );
    const infoElementFromClassNames = classnames(
      "infoElement__from",
      smaller && "infoElement__from--smaller"
    );
    return (
      <div
        key={title}
        style={{ ...style, width: width && width }}
        className={infoElementClassNames}
      >
        {svg && svg}
        <div className="infoElement__duration">{title}</div>
        <p className={infoElementFromClassNames}>
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
