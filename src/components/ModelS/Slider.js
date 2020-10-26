import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import CircleButtonsElement from "./CircleButtonsElement";
import VideoButton from "./VideoButton";
import classnames from "classnames";

const mapStateToProps = (state) => ({
  width: state.page.width,
});

export default connect(mapStateToProps)(
  ({
    numberOfSlides,
    slidesData,
    showButtons,
    showInfo,
    opacitySlider,
    swipeSlider,
    bigButtonsData,
    width,
    slideContent,
    sliderCustomClassNames,
    sliderButtonsCustomClassNames,
  }) => {
    /* Class Names */
    const sliderClassNames = classnames(
      "slider",
      sliderCustomClassNames && sliderCustomClassNames
    );
    const sliderButtonsClassNames = classnames(
      "slider__bigButtonsContainer",
      sliderButtonsCustomClassNames && sliderButtonsCustomClassNames
    );

    /* Container Position Animation */
    const [containerPosition, setContainerPosition] = useState("0");
    const [buttonsContainerPosition, setButtonsContainerPosition] = useState(
      "0"
    );
    const [activeSlider, setActiveSlider] = useState(1);
    const [animation, setAnimation] = useState(null);

    /* Re-asign to local state the data that get from props to avoid bugs */
    const [slidesDataState] = useState(slidesData);

    /* Slider Logic */
    useEffect(() => {
      if (slideContent === "videos") {
        /* Video Reset */
        slidesDataState.forEach((el) => (el.ref.current.currentTime = 0));
        slidesDataState.forEach((el, i) => {
          if (activeSlider === i + 1) {
            el.ref.current.play();
          }
        });
      }

      /* Video || Image Change depending on the active Slide */
      switch (activeSlider) {
        case 1:
          if (width <= 815) {
            setButtonsContainerPosition("30%");
          }
          setContainerPosition("0");
          setAnimation(
            setTimeout(() => {
              setActiveSlider(2);
            }, slidesDataState[activeSlider - 1].duration || 4000)
          );
          break;

        case 2:
          if (width <= 815) {
            setButtonsContainerPosition("10%");
          }
          setContainerPosition("-100%");
          setAnimation(
            setTimeout(() => {
              setActiveSlider(3);
            }, slidesDataState[activeSlider - 1].duration || 4000)
          );
          break;

        case 3:
          if (width <= 815) {
            setButtonsContainerPosition("-10%");
          }
          setContainerPosition("-200%");
          setAnimation(
            setTimeout(() => {
              setActiveSlider(4);
            }, slidesDataState[activeSlider - 1].duration || 4000)
          );
          break;

        case 4:
          if (width <= 815) {
            setButtonsContainerPosition("-30%");
          }
          setContainerPosition("-300%");
          setAnimation(
            setTimeout(() => {
              setActiveSlider(1);
            }, slidesDataState[activeSlider - 1].duration || 4000)
          );
          break;

        default:
          setButtonsContainerPosition("0");
          setContainerPosition("0");
          setAnimation(
            setTimeout(() => {
              setActiveSlider(2);
            }, 2000)
          );
          break;
      }
    }, [activeSlider, slidesDataState, width, slideContent]);

    /* Reset Slider */
    const resetAnimation = useCallback(
      (value) => {
        if (slideContent === "videos") {
          slidesDataState.forEach((el, i) => {
            el.ref.current.currentTime = 0;
          });
        }
        clearTimeout(animation);
        setActiveSlider(value);
      },
      [animation, slidesDataState, slideContent]
    );

    const renderButtons = useCallback(() => {
      /* Buttons for slider */
      const leftButtonIcon = (
        <svg
          className="slider__icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
        >
          <path d="M57.1 75.4l7.1-7.1L45.9 50l18.3-18.3-7.1-7.1L31.8 50"></path>
        </svg>
      );

      const rightButtonIcon = (
        <svg
          className="slider__icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
        >
          <polyline points="42.9 24.6 35.8 31.7 54.1 50 35.8 68.3 42.9 75.4 68.2 50"></polyline>
        </svg>
      );

      if (showButtons) {
        return (
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
        );
      }
    }, [showButtons, activeSlider, numberOfSlides, resetAnimation]);

    const renderBigButtons = useCallback(() => {
      if (bigButtonsData) {
        return (
          <div className={sliderButtonsClassNames}>
            <div
              style={{ transform: `translateX(${buttonsContainerPosition})` }}
              className="slider__bigButtonsInner"
            >
              {bigButtonsData.map((el, i) => (
                <VideoButton
                  white={el.white}
                  customClassNames="slider__videoButtonElement"
                  key={i}
                  title={el.title}
                  text={el.text}
                  smaller={el.smaller}
                  longer={el.longer}
                  showBorder={el.showBorder}
                  click={() => resetAnimation(i + 1)}
                  active={activeSlider === i + 1}
                  activeButton={activeSlider}
                  showTopBorder={el.showTopBorder}
                />
              ))}
            </div>
          </div>
        );
      }
    }, [
      activeSlider,
      bigButtonsData,
      resetAnimation,
      buttonsContainerPosition,
      sliderButtonsClassNames,
    ]);

    const renderImage = useCallback(() => {
      if (swipeSlider) {
        return slidesData.map((el, i) => (
          <img
            style={{ transform: `translateX(${containerPosition})` }}
            className="slider__image"
            src={el.image}
            alt={`${el.alt}slide${i + 1}`}
          />
        ));
      } else if (opacitySlider) {
        return (
          <img
            src={slidesData[activeSlider - 1].image}
            alt="height fix"
            className="slider__image"
          />
        );
      }
    }, [
      containerPosition,
      slidesData,
      opacitySlider,
      activeSlider,
      swipeSlider,
    ]);

    const renderVideo = useCallback(() => {
      if (swipeSlider) {
        return slidesData.map((el, i) => (
          <video
            autoPlay={el.autoPlay}
            ref={el.ref}
            key={i}
            preload="auto"
            muted
            playsInline
            loop
            style={{
              transform: `translateX(${containerPosition})`,
            }}
            className="autopilot__video"
          >
            <source src={el.link} type="video/mp4" />
          </video>
        ));
      }
    }, [swipeSlider, slidesData, containerPosition]);

    const renderInfo = useCallback(() => {
      if (showInfo) {
        return (
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
        );
      }
    }, [activeSlider, animation, numberOfSlides, showInfo, slidesData]);

    /* Render */
    return (
      <div className={sliderClassNames}>
        <div className="slider__inner">
          {slideContent === "images" && renderImage()}
          {slideContent === "videos" && renderVideo()}
          {renderButtons()}
        </div>
        {renderBigButtons()}
        {renderInfo()}
      </div>
    );
  }
);
