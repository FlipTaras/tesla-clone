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
    customTitleSmallClassNames,
    image,
    titleSmall,
    lineBottom,
    // key,
  }) => {
    const infoElementClassNames = classnames(
      "infoElement",
      // learnMoreOn && "infoElement--animationOff",
      showSection && "infoElement--show",
      customInfoElementClassNames && customInfoElementClassNames,
      white && "infoElement--white"
    );

    const titleContainerClassNames = classnames(
      "infoElement__titleContainer",
      image && "infoElement__titleContainer--align"
    );

    const titleClassNames = classnames(
      "infoElement__title",
      customTitleClassNames && customTitleClassNames
    );

    const subtitleClassNames = classnames(
      "infoElement__subtitle",
      customSubtitleClassNames && customSubtitleClassNames
    );

    const smallTitleClassNames = classnames(
      "paragraph",
      white && "infoElement__smallTitle--white",
      customTitleSmallClassNames && customTitleSmallClassNames
    );

    const lineClassNames = classnames(
      "infoElement__line",
      white && "infoElement__line--white",
      lineBottom && "infoElement__line--bottom"
    );

    return (
      <div className={infoElementClassNames}>
        <div className={titleContainerClassNames}>
          {svg && svg}
          <div className={titleClassNames}>{title}</div>
          {image && (
            <img className="infoElement__icon" src={image} alt="icon" />
          )}
          {titleSmall && (
            <span className={smallTitleClassNames}>{titleSmall}</span>
          )}
        </div>
        <p className={subtitleClassNames}>{subtitle}</p>
        {showLine && <div className={lineClassNames}></div>}
      </div>
    );
  }
);
