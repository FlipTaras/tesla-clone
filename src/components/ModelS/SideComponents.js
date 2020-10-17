import React from "react";
import { connect } from "react-redux";
import LearnMoreButton from "../Buttons/LearnMoreButton";
import OrderButton from "../Buttons/OrderButton";
import { setPageToShow } from "../../static/store/actions";
import classnames from "classnames";

const mapActionToProps = {
  setPageToShow,
};

export default connect(
  null,
  mapActionToProps
)(
  ({
    title,
    subtitle,
    paragraph,
    learnMoreOn,
    checkRenderInfo,
    customClassNames,
    customParagraphClassNames,
    horizontal,
    showSection,
    learnMoreHandle,
    showLearnMore,
    customInnerContainerClassNames,
  }) => {
    console.log(showSection);
    const sideComponentClassNames = classnames(
      "sideComponent",
      horizontal && "sideComponent--horizontal",
      customClassNames && customClassNames
    );

    const innerContainerClassNames = classnames(
      "sideComponent__innerContainer",
      horizontal && "sideComponent__innerContainer--horizontal",
      customInnerContainerClassNames && customInnerContainerClassNames
    );

    const titleSubtitleContainerClassNames = classnames(
      "sideComponent__titleSubtitleContainer",
      horizontal && "sideComponent__titleSubtitleContainer--horizontal",
      showSection && "sideComponent__titleSubtitleContainer--noAnimation"
    );

    const paragraphClassNames = classnames(
      "sideComponent__paragraph",
      horizontal && "sideComponent__paragraph--horizontal",
      customParagraphClassNames && customParagraphClassNames,
      showSection && "sideComponent__paragraph--noAnimation"
    );

    const buttonsClassNames = classnames(
      "sideComponent__buttons",
      horizontal && "sideComponent__buttons--horizontal",
      showSection && "sideComponent__buttons--noAnimation"
    );

    return (
      <div className={sideComponentClassNames}>
        {checkRenderInfo && (
          <div className={innerContainerClassNames}>
            <div className={titleSubtitleContainerClassNames}>
              <h2 className="sideComponent__subtitle">{subtitle}</h2>
              <h1 className="sideComponent__title">{title}</h1>
            </div>
            <p className={paragraphClassNames}>{paragraph}</p>
            <div className={buttonsClassNames}>
              <LearnMoreButton
                classNames="sideComponent__learnMoreButton"
                disabled={learnMoreOn || showLearnMore}
                click={learnMoreHandle}
              />
              <OrderButton classNames="sideComponent__orderButton" />
            </div>
          </div>
        )}
      </div>
    );
  }
);
