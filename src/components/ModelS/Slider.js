import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import CircleButtonsElement from "./CircleButtonsElement";
import VideoButton from "./VideoButton";
import classnames from "classnames";
import RangeAnimationElement from "./RangeAnimationElement";
import ImageFix from "../../static/images/ModelS/Range/learnMoreSlider1.jpg";
import VideoFix from "../../static/videos/ModelS/performancemotor_desktop.mp4";

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
    medium,
    big,
  }) => {
    /* Set flex depending on the max Elements */
    useEffect(() => {
      switch (numberOfSlides) {
        case 2:
          document.documentElement.style.setProperty("--flex", `0.5`);
          break;
        case 3:
          document.documentElement.style.setProperty("--flex", `0.33`);
          break;
        case 4:
          document.documentElement.style.setProperty("--flex", `0.25`);
          break;
        case 5:
          document.documentElement.style.setProperty("--flex", `0.2`);
          break;

        default:
          break;
      }
    }, [numberOfSlides]);

    /* Class Names */
    const sliderClassNames = classnames(
      "slider",
      sliderCustomClassNames && sliderCustomClassNames
    );

    const sliderButtonsClassNames = classnames(
      "slider__bigButtonsContainer",
      sliderButtonsCustomClassNames && sliderButtonsCustomClassNames
    );

    const innerClassNames = classnames(
      "slider__inner",
      big && "slider__inner--big",
      medium && "slider__inner--medium"
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
      /* Reset For videos */
      if (slideContent === "videos") {
        /* Video Reset */
        slidesDataState.forEach((el) => (el.ref.current.currentTime = 0));
        slidesDataState.forEach((el, i) => {
          if (activeSlider === i + 1) {
            el.ref.current.play();
          }
        });
      }

      /* Setter Slider Logic Helper */
      const setter = (
        active,
        containerPosition,
        button450,
        button815,
        buttonDefault = "0"
      ) => {
        /* Set Container Position */
        setContainerPosition(containerPosition);

        /* Set Button Position */
        if (width <= 450) {
          setButtonsContainerPosition(button450);
        } else if (width <= 815) {
          setButtonsContainerPosition(button815);
        } else {
          setButtonsContainerPosition(buttonDefault);
        }

        /* Set change of the slide */
        setAnimation(
          setTimeout(
            () => {
              setActiveSlider(active);
            },
            slidesDataState
              ? slidesDataState[activeSlider - 1].duration || 4000
              : 6000
          )
        );
      };

      /* Slider Animation depending on the number of slides */
      /* 3 Slides */
      if (numberOfSlides === 2) {
        switch (activeSlider) {
          case 1:
            setter(2, "0", "30%", "20%");
            break;
          case 2:
            setter(1, "0", "-20%", "0%");
            break;

          default:
            break;
        }
      } else if (numberOfSlides === 3) {
        switch (activeSlider) {
          case 1:
            setter(2, "0", "30%", "20%");
            break;
          case 2:
            setter(3, "-100%", "0", "0");
            break;
          case 3:
            setter(1, "-200%", "-30%", "-20%");
            break;
          default:
            break;
        }
      } else if (numberOfSlides === 4) {
        /* 4 sides */
        switch (activeSlider) {
          case 1:
            setter(2, "0", "40%", "30%");
            break;
          case 2:
            setter(3, "-100%", "15%", "10%");
            break;
          case 3:
            setter(4, "-200%", "-10%", "-10%");
            break;
          case 4:
            setter(1, "-300%", "-30%", "-30%");
            break;
          default:
            break;
        }
      } else if (numberOfSlides === 5) {
        /* 5 Slides*/
        switch (activeSlider) {
          case 1:
            setter(2, "0", "40%", "30%", "20%");
            break;
          case 2:
            setter(3, "-100%", "20%", "10%", "0");
            break;
          case 3:
            setter(4, "-200%", "0", "-10%", "-20%");

            break;
          case 4:
            setter(5, "-300%", "-20%", "-10%", "-20%");

            break;
          case 5:
            setter(1, "-400%", "-40%", "-20%", "-20%");

            break;
          default:
            break;
        }
      }
    }, [activeSlider, slidesDataState, width, slideContent, numberOfSlides]);

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
                  buttons={el.buttons}
                  showBorder={el.showBorder}
                  click={() => resetAnimation(i + 1)}
                  active={activeSlider === i + 1}
                  activeButton={activeSlider}
                  showTopBorder={el.showTopBorder}
                  subtitleMiles={el.subtitleMiles}
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
      const imageClassNames = classnames(
        "slider__image",
        medium && "slider__image--medium"
      );
      if (swipeSlider) {
        return slidesData.map((el, i) => (
          <img
            key={i}
            style={{ transform: `translateX(${containerPosition})` }}
            className={imageClassNames}
            src={el.image}
            alt={`${el.alt}slide${i + 1}`}
          />
        ));
      } else if (opacitySlider) {
        return (
          <img
            src={slidesData[activeSlider - 1].image}
            alt="Slider"
            className={imageClassNames}
          />
        );
      }
    }, [
      containerPosition,
      slidesData,
      opacitySlider,
      activeSlider,
      swipeSlider,
      medium,
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
            className="slider__video"
          >
            <source src={el.link} type="video/mp4" />
          </video>
        ));
      } else if (opacitySlider) {
        return (
          <>
            <video
              autoPlay
              playsInline
              preload="auto"
              loop
              muted
              className="slider__videoFix"
            >
              <source src={VideoFix} type="type/mp4" />
            </video>
            {slidesData.map((el, i) => (
              <video
                key={i}
                autoPlay
                playsInline
                preload="auto"
                loop
                muted
                ref={el.ref}
                className={
                  activeSlider === i + 1
                    ? "slider__videoOpacitySlider slider__videoOpacitySlider--active"
                    : "slider__videoOpacitySlider "
                }
              >
                <source src={el.link} type="video/mp4" />
              </video>
            ))}
          </>
        );
      }
    }, [
      swipeSlider,
      slidesData,
      containerPosition,
      opacitySlider,
      activeSlider,
    ]);

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

    const renderAnimatedElement = useCallback(() => {
      const pageAnimationElements = Array.from(Array(numberOfSlides).keys());
      return (
        <>
          <img
            src={ImageFix}
            alt="height fix"
            style={{ opacity: "0", width: "100%", height: "100%" }}
          />

          {pageAnimationElements.map((el, i) => (
            <RangeAnimationElement
              page="Model S"
              activeSlider={activeSlider}
              show={activeSlider === i + 1}
              key={i}
            />
          ))}
        </>
      );
    }, [numberOfSlides, activeSlider]);

    /* Render */
    return (
      <div className={sliderClassNames}>
        <div className={innerClassNames}>
          {slideContent === "animationElement" && renderAnimatedElement()}
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
