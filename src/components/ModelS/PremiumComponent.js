import React from "react";
import classnames from "classnames";

export default ({ video, image, alt, text, title, order }) => {
  const contentContainerClassNames = classnames(
    "premiumComponent__contentContainer",
    order === 2 && "premiumComponent__contentContainer--2"
  );
  const textContainerClassNames = classnames(
    "premiumComponent__textContainer",
    order === 2 && "premiumComponent__textContainer--2"
  );
  const renderImageOrVideo = () => {
    if (video) {
      return (
        <video
          preload="auto"
          muted
          autoPlay
          playsInline
          loop
          className="premiumComponent__video"
        >
          <source src={video} type="video/mp4" />
        </video>
      );
    } else if (image) {
      return <img className="premiumComponent__image" src={image} alt={alt} />;
    }
  };

  return (
    <div className="premiumComponent">
      <div className={contentContainerClassNames}>{renderImageOrVideo()}</div>
      <div className={textContainerClassNames}>
        <h4 className="premiumComponent__title paragraph">{title}</h4>
        <p className="premiumComponent__text paragraph">{text}</p>
      </div>
    </div>
  );
};
