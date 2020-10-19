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
    svg,
    subtitle,
    showLine,
    white,
    showSection,
    // learnMoreOn,
    customInfoElementClassNames,
    customTitleClassNames,
    customSubtitleClassNames,
  }) => {
    const infoElementClassNames = classnames(
      "infoElement",
      showSection && "infoElement--show",
      // learnMoreOn && "infoElement--animationOff",
      customInfoElementClassNames && customInfoElementClassNames
    );
    const titleClassNames = classnames(
      "infoElement__title",
      customTitleClassNames && customTitleClassNames
    );
    const subtitleClassNames = classnames(
      "infoElement__subtitle",
      customSubtitleClassNames && customSubtitleClassNames
    );

    return (
      <div key={title} className={infoElementClassNames}>
        <div className="infoElement__titleContainer">
          {svg && svg}
          <div className={titleClassNames}>{title}</div>
        </div>
        <p className={subtitleClassNames}>{subtitle}</p>
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
