import React from "react";

export default ({
  show,
  title,
  titleFont,
  titleAnimation,
  text,
  textAnimation,
  elementTop,
  elementLeft,
  elementBottom,
  elementRight,
  lineTop,
  lineLeft,
  lineBottom,
  lineRight,
  lineHeight,
  dotTop,
  dotLeft,
  dotBottom,
  dotRight,
  lineAnimation,
  dotAnimation,
}) => {
  return (
    <div
      style={{
        top: elementTop,
        left: elementLeft,
        bottom: elementBottom,
        right: elementRight,
      }}
      className="safetyAnimatedElement"
    >
      <div
        style={{
          top: lineTop,
          bottom: lineBottom,
          left: lineLeft,
          right: lineRight,
          height: lineHeight,
          animation: lineAnimation,
        }}
        className={
          show
            ? "safetyAnimatedElement__line safetyAnimatedElement__line--show"
            : "safetyAnimatedElement__line"
        }
      ></div>
      <div
        style={{
          top: dotTop,
          bottom: dotBottom,
          left: dotLeft,
          right: dotRight,
          animation: dotAnimation,
        }}
        className={
          show
            ? "safetyAnimatedElement__dot safetyAnimatedElement__dot--show"
            : "safetyAnimatedElement__dot"
        }
      ></div>
      <div className="safetyAnimatedElement__infoContainer">
        <h1
          style={{
            animation: titleAnimation,
            fontFamily: titleFont && titleFont,
          }}
          className={
            show
              ? "safetyAnimatedElement__title safetyAnimatedElement__title--show"
              : "safetyAnimatedElement__title"
          }
        >
          {title}
        </h1>
        <p
          style={{ animation: textAnimation }}
          className="safetyAnimatedElement__text"
        >
          {text}
        </p>
      </div>
    </div>
  );
};
