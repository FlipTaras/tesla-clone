import React from "react";
import classnames from "classnames";
import CircleButtonsElement from "./CircleButtonsElement";

export default ({
  video,
  poster,
  title,
  paragraph,
  customTitleClassNames,
  customInfoContainerClassNames,
  customVideoInnerClassNames,
  active,
}) => {
  const titleClassNames = classnames(
    "learnMoreVideoTextContainer__title title",
    customTitleClassNames && customTitleClassNames
  );

  const videoInnerClassNames = classnames(
    "learnMoreVideoTextContainer__videoInner",
    customVideoInnerClassNames && customVideoInnerClassNames
  );

  const infoContainerClassNames = classnames(
    "learnMoreVideoTextContainer__infoContainer",
    customInfoContainerClassNames && customInfoContainerClassNames
  );

  return (
    <div className="learnMoreVideoTextContainer">
      <div className={videoInnerClassNames}>
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
        {active && <CircleButtonsElement numberOfElement={3} active={active} />}

        <h1 className={titleClassNames}>{title}</h1>
        <p className="learnMoreVideoTextContainer__paragraph paragraph">
          {paragraph}
        </p>
      </div>
    </div>
  );
};
