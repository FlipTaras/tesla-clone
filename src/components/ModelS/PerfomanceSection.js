import React, { useCallback, useEffect, useRef, useState } from "react";
import LearnMoreButton from "../Buttons/LearnMoreButton";
import OrderButton from "../Buttons/OrderButton";
import InfoElement from "./InfoElement";
import CountUp from "react-countup";
import CloseNextButton from "../Buttons/CloseNextButton";
import VideoButton from "./VideoButton";

/* Redux */
import { connect } from "react-redux";
import { setPageToShow, setSilentScrollTo } from "../../static/store/actions";

/* Videos and Posters Imports */
import Image from "../../static/images/ModelS/Perfomance/model-s-performance.jpg";
import ImageLand from "../../static/images/ModelS/Perfomance/model-s-performance-portrait.jpg";
import imagePhone from "../../static/images/ModelS/Perfomance/model-s-performance-mobile.jpg";
import Poster1 from "../../static/images/ModelS/Perfomance/dualmotor_desktop_poster.png";
import Poster2 from "../../static/images/ModelS/Perfomance/performancemotor_desktop_poster.png";
import Poster3 from "../../static/images/ModelS/Perfomance/total-control-s-poster.png";

import Video3 from "../../static/videos/ModelS/KD8BAH_total-control-s_0.mp4-2000_M3C5DL.mp4";
import Video2 from "../../static/videos/ModelS/performancemotor_desktop.mp4";
import Video1 from "../../static/videos/ModelS/dualmotor_desktop.mp4";

const mapStateToProps = (state) => ({
  pageIndex: state.models.pageIndex,
  pageYOffset: state.page.pageYOffset,
  stopAnimation: state.models.stopAnimation,
  width: state.page.width,
  height: state.page.height,
});

const mapActionToProps = {
  setPageToShow,
  setSilentScrollTo,
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(
  ({
    pageIndex,
    learnMoreOn,
    setPageToShow,
    setSilentScrollTo,
    pageYOffset,
    bottomContainerPerfomanceRef,
    stopAnimation,
    width,
    height,
    phoneLayout,
  }) => {
    const [showLearnMore, setShowLearnMore] = useState(false);
    const [activeButton, setActiveButton] = useState(1);
    const checkIpad = height <= 1366 && width <= 1024;
    const dualMotorRef = useRef(null);

    /* Get section offset, used for Animation on small screens  */
    const sectionRef = useRef(null);
    const learnMoreSectionRef = useRef(null);
    const [sectionTop, setSectionTop] = useState(null);
    const [learnMoreSectionTop, setLearnMoreSectionTop] = useState(null);
    const [learnMoreSectionBottom, setLearnMoreSectionBottom] = useState(null);

    useEffect(() => {
      const getAndShowTop = () => {
        const rectSection = sectionRef.current.getBoundingClientRect();
        const rectLearnMoreSection = learnMoreSectionRef.current?.getBoundingClientRect();
        setSectionTop(rectSection.top);
        setLearnMoreSectionTop(rectLearnMoreSection.top);
        setLearnMoreSectionBottom(rectLearnMoreSection.bottom);
      };
      if (sectionRef.current) {
        window.addEventListener("wheel", getAndShowTop);
        window.addEventListener("scroll", getAndShowTop);
        window.addEventListener("touchmove", getAndShowTop);
      }
      return () => {
        window.removeEventListener("wheel", getAndShowTop);
        window.removeEventListener("scroll", getAndShowTop);
        window.removeEventListener("touchmove", getAndShowTop);
      };
    }, []);

    /* Scroll Learn more page into view */
    useEffect(() => {
      if (learnMoreOn) {
        window.scrollTo({
          top: learnMoreSectionRef.current?.offsetTop,
          behavior: "smooth",
        });
      }
    }, [learnMoreOn, height]);

    /* Render functionality */
    const renderTopContainer = useCallback(() => {
      /* svgElement */
      const svgSpeed = (
        <svg
          version="1.1"
          id="L2"
          xmlns="http://www.w3.org/2000/svg"
          //   xmlnXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 -1 50 40"
          enableBackground="new 0 0 50 20"
          xmlSpace="preserve"
        >
          <path
            id="d87ad07d 2640 4933 80f4 8c7bec5a0faa"
            d="M30.0073 15.2901C18.8886 15.3048 9.88493 24.3085 9.87024 35.4272C9.85556 38.4382 10.5312 41.4051 11.8384 44.1224C12.0881 44.6365 12.705 44.8568 13.2191 44.6071C13.7332 44.3574 13.9535 43.7405 13.7038 43.2264C9.41492 34.2228 13.2191 23.4419 22.2228 19.1383C31.2117 14.8348 41.9926 18.6389 46.2962 27.6426C48.6022 32.4749 48.6463 38.071 46.4284 42.9327C46.1934 43.4615 46.4137 44.0783 46.9425 44.3133C47.4712 44.5484 48.0881 44.328 48.3231 43.7993C52.9498 33.6793 48.4994 21.7234 38.3794 17.1114C35.7356 15.907 32.8862 15.2901 30.0073 15.2901Z"
            fill="white"
          />

          <line
            fill="white"
            strokeLinecap="round"
            stroke="white"
            strokeWidth="4"
            strokeMiterlimit="10"
            x1="20"
            y1="40"
            x2="30"
            y2="40"
            transform={
              learnMoreOn
                ? "rotate(170 30 40)"
                : stopAnimation
                ? "rotate(170 30 40)"
                : ""
            }
          >
            {learnMoreOn ? null : stopAnimation ? null : (
              <animateTransform
                attributeName="transform"
                dur="1s"
                type="rotate"
                from="0 30 40"
                to="170 30 40"
                fill="freeze"
                begin="1s"
              />
            )}
          </line>
        </svg>
      );
      /* CountUp Element */
      const countUpElement = (
        <CountUp
          delay={learnMoreOn ? 0 : stopAnimation ? 0 : 1}
          start={learnMoreOn ? 2.3 : stopAnimation ? 2.3 : 0}
          end={2.3}
          duration={3}
          suffix={"s"}
          decimals={1}
          useEasing
        />
      );

      if (pageIndex === "2" || (phoneLayout && sectionTop <= 600)) {
        return (
          <div className="perfomance__infoElements">
            <InfoElement
              smaller
              title="AWD"
              firstText={
                width >= 1024
                  ? "Dual Motor All-Wheel Drive instantly controls"
                  : "Standart"
              }
              secondText={
                width >= 1024
                  ? "traction and torque, in all weather conditions"
                  : "All-Wheel Drive"
              }
              style={
                learnMoreOn
                  ? { animation: "none", opacity: "1" }
                  : {
                      opacity: "0",
                      animation: "translateYOpacityShow .6s .6s forwards ease",
                    }
              }
              showLine
              white
            />
            <InfoElement
              smaller
              title={countUpElement}
              firstText={
                width >= 1024
                  ? "The quickest acceleration on earth—from"
                  : "0-60mph in"
              }
              secondText={
                width >= 1024
                  ? "zero to 60 mph in as little as 2.3 seconds"
                  : "2.3 secs"
              }
              svg={svgSpeed}
              width={width < 600 ? "9rem" : width < 1024 && "13rem"}
              style={
                learnMoreOn
                  ? { animation: "none", opacity: "1" }
                  : {
                      opacity: "0",
                      animation: "translateYOpacityShow .6s .8s forwards ease",
                    }
              }
              showLine
              white
            />
            <InfoElement
              smaller
              title="163mph"
              firstText={
                width >= 1024 ? "Improved handling and aerodynamics" : "Top"
              }
              secondText={
                width >= 1024 ? "allow for a top speed of 163 mph" : "Speed"
              }
              style={
                learnMoreOn
                  ? { animation: "none", opacity: "1" }
                  : {
                      opacity: "0",
                      animation: "translateYOpacityShow .6s 1s forwards ease",
                    }
              }
            />
          </div>
        );
      } else {
        return null;
      }
    }, [pageIndex, learnMoreOn, stopAnimation, width, phoneLayout, sectionTop]);

    const renderBottomContainer = useCallback(() => {
      const LearnMoreHandler = () => {
        if (!phoneLayout) {
          setPageToShow("perfomance");
        } else {
          setShowLearnMore(true);
          window.scrollTo({
            top: learnMoreSectionRef.current?.offsetTop,
            behavior: "smooth",
          });
        }
      };

      const buttonContainer = (
        <div className="perfomance__buttons">
          <LearnMoreButton
            classNames="perfomance__learnMoreButton"
            disabled={learnMoreOn || showLearnMore}
            click={LearnMoreHandler}
          />
          <OrderButton classNames="perfomance__orderButton" />
        </div>
      );

      if (pageIndex === "2" || (phoneLayout && sectionTop <= 550)) {
        return (
          <div
            ref={bottomContainerPerfomanceRef}
            className={
              learnMoreOn
                ? "perfomance__bottomContainerInner perfomance__bottomContainerInner--show"
                : "perfomance__bottomContainerInner"
            }
          >
            <div className="perfomance__leftContainer">
              <h2 className="subtitle">Performance</h2>
              <h1 className="perfomance__title  title">
                Quickest Acceleration
              </h1>

              {height <= 416 ? null : width > 700 && buttonContainer}
            </div>
            <div className="perfomance__rightContainer">
              <p className="paragraph perfomance__text">
                Model S sets an industry standard for performance and safety.
                Tesla’s all-electric powertrain delivers unparalleled
                performance in all weather conditions – with Dual Motor
                All-Wheel Drive, adaptive air suspension and ludicrous
                acceleration.
              </p>
              {height <= 416
                ? buttonContainer
                : width <= 700 && buttonContainer}
            </div>
          </div>
        );
      } else {
        return null;
      }
    }, [
      pageIndex,
      setPageToShow,
      learnMoreOn,
      bottomContainerPerfomanceRef,
      phoneLayout,
      sectionTop,
      showLearnMore,
      width,
      height,
    ]);

    const renderLearnMoreSection = useCallback(() => {
      /* Figure out when dualMotor come into view to play animation */
      const dualMotorTop = dualMotorRef.current?.getBoundingClientRect().top;

      const CloseHandler = () => {
        if (!phoneLayout) {
          setPageToShow(null);
          setSilentScrollTo("perfomance");
        } else {
          setShowLearnMore(false);
          window.scrollTo({
            top: sectionRef.current?.offsetTop,
            behavior: "smooth",
          });
        }
      };

      const NextHandler = () => {
        setPageToShow(null);
        setSilentScrollTo("range");
      };

      const closeButtonElement = (
        <CloseNextButton
          close={phoneLayout ? true : pageYOffset < 1550}
          click={
            phoneLayout
              ? CloseHandler
              : pageYOffset < 1550
              ? CloseHandler
              : NextHandler
          }
        />
      );
      const renderCloseButton = () => {
        if (
          learnMoreSectionTop < height - 20 &&
          learnMoreSectionBottom >= height
        ) {
          return closeButtonElement;
        } else {
          return null;
        }
      };

      const buttons1 = [
        {
          buttonTitle: "3.7s",
          buttonFirstText: "0-60",
          buttonSecondtext: "mph",
        },
        {
          buttonTitle: "402",
          buttonFirstText: "mile",
          buttonSecondtext: "range",
        },
      ];

      const buttons2 = [
        {
          buttonTitle: "2.3s",
          buttonFirstText: "0-60",
          buttonSecondtext: "mph",
        },
        {
          buttonTitle: "348",
          buttonFirstText: "mile",
          buttonSecondtext: "range",
        },
      ];

      if (learnMoreOn || showLearnMore) {
        return (
          <>
            <div className="perfomance__learnMoreInner">
              <div className="perfomance__info">
                <h1 className="perfomance__learnMoreTitle title">
                  Electric Powertrain
                </h1>
                <p className="perfomance__learnMoreParagraph paragraph">
                  The all-electric powertrain and low center of gravity provide
                  the best performance, range and efficiency.
                </p>
              </div>
              <div className="perfomance__videosContainer">
                <video
                  playsInline
                  className={
                    activeButton === 1
                      ? "perfomance__video perfomance__video--active"
                      : "perfomance__video"
                  }
                  preload="auto"
                  loop
                  muted
                  poster={Poster1}
                  autoPlay
                >
                  {activeButton === 1 && <source src={Video1} />}
                </video>
                <video
                  playsInline
                  className={
                    activeButton === 2
                      ? "perfomance__video perfomance__video--active"
                      : "perfomance__video"
                  }
                  preload="auto"
                  loop
                  muted
                  poster={Poster2}
                  autoPlay
                >
                  {activeButton === 2 && <source src={Video2} />}
                </video>
              </div>
              <div className="perfomance__videoButtons">
                <VideoButton
                  title="Long Range Plus"
                  text="Premium option with all-wheel drive and longest range"
                  buttons={buttons1}
                  showBorder
                  click={() => setActiveButton(1)}
                  active={activeButton === 1}
                  activeButton={activeButton}
                />
                <VideoButton
                  title="Perfomance"
                  text="Perfomance option with all-wheel drive and ludicrous acceleration"
                  buttons={buttons2}
                  click={() => setActiveButton(2)}
                  active={activeButton === 2}
                  activeButton={activeButton}
                />
              </div>
            </div>
            <div
              ref={dualMotorRef}
              className="perfomance__learnMoreDualMotorSection"
            >
              <div className="perfomance__learnMoreDualMotorVideoContainer">
                <div
                  className={
                    dualMotorTop < 700
                      ? "perfomance__learnMoreDualMotorVideoInner perfomance__learnMoreDualMotorVideoInner--show"
                      : "perfomance__learnMoreDualMotorVideoInner"
                  }
                >
                  <video
                    playsInline
                    preload="auto"
                    loop
                    muted
                    className="perfomance__learnMoreDualMotorVideo"
                    src={Video3}
                    poster={Poster3}
                    autoPlay
                  ></video>
                </div>
              </div>
              <div
                className={
                  dualMotorTop < 700
                    ? "perfomance__learnMoreDualMotorInfo perfomance__learnMoreDualMotorInfo--show"
                    : "perfomance__learnMoreDualMotorInfo"
                }
              >
                <h1 className="perfomance__dualTitle title">
                  Dual Motor <br />
                  All-Wheel Drive
                </h1>
                <p className="perfomance__dualParagraph paragraph">
                  Only Tesla has the technology that provides dual motors with
                  independent traction to both front and rear wheels for
                  unparalleled control, in all weather conditions. As a result,
                  Model S instantly controls traction and torque to every wheel,
                  with a unique and superior all-wheel drive system.
                </p>
              </div>
            </div>
            {renderCloseButton()}
          </>
        );
      } else {
        return null;
      }
    }, [
      setPageToShow,
      setSilentScrollTo,
      learnMoreOn,
      pageYOffset,
      activeButton,
      phoneLayout,
      showLearnMore,
      height,
      learnMoreSectionBottom,
      learnMoreSectionTop,
    ]);

    const renderSection = useCallback(() => {
      return (
        <>
          <div
            className="perfomance__topContainer"
            style={{
              background: `url(${
                width < 639 ? imagePhone : checkIpad ? ImageLand : Image
              })`,
            }}
          >
            {renderTopContainer()}
          </div>
          <div className="perfomance__bottomContainer">
            {renderBottomContainer()}
          </div>
          <div
            ref={learnMoreSectionRef}
            className="perfomance__learnMoreContainer"
          >
            {renderLearnMoreSection()}
          </div>
        </>
      );
    }, [
      checkIpad,
      renderBottomContainer,
      renderLearnMoreSection,
      renderTopContainer,
      width,
    ]);
    return (
      <section ref={sectionRef} className="section perfomance">
        {phoneLayout ? (
          <div className="fp-tableCell">{renderSection()}</div>
        ) : (
          <>{renderSection()}</>
        )}
      </section>
    );
  }
);
