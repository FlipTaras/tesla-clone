import React from "react";
import classnames from "classnames";

export default ({
  video,
  poster,
  title,
  paragraph,
  customTitleClassNames,
  customInfoContainerClassNames,
  active,
}) => {
  const titleClassNames = classnames(
    "learnMoreVideoTextContainer__title title",
    customTitleClassNames && customTitleClassNames
  );

  const infoContainerClassNames = classnames(
    "learnMoreVideoTextContainer__infoContainer",
    customInfoContainerClassNames && customInfoContainerClassNames
  );

  return (
    <div className="learnMoreVideoTextContainer">
      <div className="learnMoreVideoTextContainer__videoInner">
        <video
          playsInline
          preload="auto"
          loop
          muted
          className="learnMoreVideoTextContainer__video"
          src={video}
          poster={poster}
          autoPlay
        ></video>
      </div>
      <div className={infoContainerClassNames}>
        {active && (
          <div className="learnMoreVideoTextContainer__buttonsContainer">
            <div
              className={classnames(
                "learnMoreVideoTextContainer__button",
                active === 1 && "learnMoreVideoTextContainer__button--active"
              )}
            ></div>
            <div
              className={classnames(
                "learnMoreVideoTextContainer__button",
                active === 2 && "learnMoreVideoTextContainer__button--active"
              )}
            ></div>
            <div
              className={classnames(
                "learnMoreVideoTextContainer__button",
                active === 3 && "learnMoreVideoTextContainer__button--active"
              )}
            ></div>
          </div>
        )}

        <h1 className={titleClassNames}>{title}</h1>
        <p className="learnMoreVideoTextContainer__paragraph paragraph">
          {paragraph}
        </p>
      </div>
    </div>
  );
};
