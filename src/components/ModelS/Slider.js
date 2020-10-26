import React, { useEffect, useState, useCallback } from "react";
import CircleButtonsElement from "./CircleButtonsElement";

export default ({ numberOfSlides, slidesData }) => {
  /* Container Position Animation */
  const [containerPosition, setContainerPosition] = useState("0");
  const [activeSlider, setActiveSlider] = useState(1);
  const [animation, setAnimation] = useState(null);

  useEffect(() => {
    switch (activeSlider) {
      case 1:
        setContainerPosition("0");
        break;
      case 2:
        setContainerPosition("-100%");
        break;
      case 3:
        setContainerPosition("-200%");
        break;
      case 4:
        setContainerPosition("-300%");
        break;

      default:
        setContainerPosition("0");
        break;
    }
  }, [activeSlider]);

  useEffect(() => {
    setAnimation(
      setTimeout(() => {
        if (activeSlider === numberOfSlides) {
          setActiveSlider(1);
        } else {
          setActiveSlider(activeSlider + 1);
        }
      }, 4000)
    );
  }, [activeSlider, numberOfSlides]);

  /* Reset Slider */
  const resetAnimation = useCallback(
    (value) => {
      clearTimeout(animation);
      setActiveSlider(value);
    },
    [animation]
  );

  /* Buttons for slider */
  const leftButtonIcon = (
    <svg
      class="slider__icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
    >
      <path d="M57.1 75.4l7.1-7.1L45.9 50l18.3-18.3-7.1-7.1L31.8 50"></path>
    </svg>
  );

  const rightButtonIcon = (
    <svg
      class="slider__icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
    >
      <polyline points="42.9 24.6 35.8 31.7 54.1 50 35.8 68.3 42.9 75.4 68.2 50"></polyline>
    </svg>
  );

  /* Render */
  return (
    <div className="slider">
      <div className="slider__inner">
        {slidesData.map((el, i) => (
          <img
            style={{ transform: `translateX(${containerPosition})` }}
            className="slider__image"
            src={el.image}
            alt={`${el.alt}slide${i + 1}`}
          />
        ))}
        <div className="slider__buttons">
          <button
            className="slider__button"
            onClick={
              activeSlider === 1
                ? () => resetAnimation(numberOfSlides)
                : () => resetAnimation(activeSlider - 1)
            }
          >
            {leftButtonIcon}
          </button>
          <button
            className="slider__button"
            onClick={
              activeSlider === numberOfSlides
                ? () => resetAnimation(1)
                : () => resetAnimation(activeSlider + 1)
            }
          >
            {rightButtonIcon}
          </button>
        </div>
      </div>
      <div className="slider__infoContainer">
        {slidesData.map(
          (el, i) =>
            activeSlider === i + 1 && (
              <p className="slider__paragraph">{el.paragraph}</p>
            )
        )}
        <CircleButtonsElement
          animation={animation}
          numberOfElement={numberOfSlides}
          white
          active={activeSlider}
          setActive={setActiveSlider}
        />
      </div>
    </div>
  );
};
