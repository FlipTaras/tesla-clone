import React, { useCallback, useEffect } from "react";
import Image from "../../static/images/ModelS/model-s-performance.jpg";
import LearnMoreButton from "../Buttons/LearnMoreButton";
import OrderButton from "../Buttons/OrderButton";
import InfoElement from "./InfoElement";
import CountUp from "react-countup";
import { connect } from "react-redux";
import { setPageToShow, setSilentScrollTo } from "../../static/store/actions";
import CloseNextButton from "../Buttons/CloseNextButton";

const mapStateToProps = (state) => ({
  pageIndex: state.models.pageIndex,
  pageYOffset: state.page.pageYOffset,
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
    stopPerfomanceAnimation,
  }) => {
    /* Scroll Learn more page into view */
    useEffect(() => {
      if (learnMoreOn) {
        window.scrollTo({ top: 755, behavior: "smooth" });
      }
    }, [learnMoreOn]);

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
                : stopPerfomanceAnimation
                ? "rotate(170 30 40)"
                : ""
            }
          >
            {learnMoreOn ? null : stopPerfomanceAnimation ? null : (
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
      const countUpElement = (
        <CountUp
          delay={learnMoreOn ? 0 : stopPerfomanceAnimation ? 0 : 1}
          start={learnMoreOn ? 2.3 : stopPerfomanceAnimation ? 2.3 : 0}
          end={2.3}
          duration={3}
          suffix={"s"}
          decimals={1}
          useEasing
        />
      );
      if (pageIndex === "2") {
        return (
          <div className="perfomance__infoElements">
            <InfoElement
              title="AWD"
              firstText="Dual Motor All-Wheel Drive instantly controls"
              secondText="traction and torque, in all weather conditions"
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
              stopPerfomanceAnimation={stopPerfomanceAnimation}
            />
            <InfoElement
              title={countUpElement}
              firstText="The quickest acceleration on earth—from"
              secondText="zero to 60 mph in as little as 2.3 seconds"
              svg={svgSpeed}
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
              stopPerfomanceAnimation={stopPerfomanceAnimation}
            />
            <InfoElement
              title="163mph"
              firstText="Improved handling and aerodynamics"
              secondText="allow for a top speed of 163 mph"
              style={
                learnMoreOn
                  ? { animation: "none", opacity: "1" }
                  : {
                      opacity: "0",
                      animation: "translateYOpacityShow .6s 1s forwards ease",
                    }
              }
              stopPerfomanceAnimation={stopPerfomanceAnimation}
            />
          </div>
        );
      } else {
        return null;
      }
    }, [pageIndex, learnMoreOn, stopPerfomanceAnimation]);

    const renderBottomContainer = useCallback(() => {
      const LearnMoreHandler = () => {
        setPageToShow("perfomance");
      };
      if (pageIndex === "2") {
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
              <h1 className="title">Quickest Acceleration</h1>
              <div className="perfomance__buttons">
                <LearnMoreButton click={LearnMoreHandler} />
                <OrderButton />
              </div>
            </div>
            <div className="perfomance__rightContainer">
              <p className="paragraph perfomance__text">
                Model S sets an industry standard for performance and safety.
                Tesla’s all-electric powertrain delivers unparalleled
                performance in all weather conditions – with Dual Motor
                All-Wheel Drive, adaptive air suspension and ludicrous
                acceleration.
              </p>
            </div>
          </div>
        );
      } else {
        return null;
      }
    }, [pageIndex, setPageToShow, learnMoreOn, bottomContainerPerfomanceRef]);

    const renderLearnMoreSection = useCallback(() => {
      const CloseHandler = () => {
        setPageToShow(null);
        setSilentScrollTo("perfomance");
      };
      const NextHandler = () => {
        setPageToShow(null);
        setSilentScrollTo("range");
      };
      if (learnMoreOn) {
        return (
          <div className="perfomance__learnMoreContainer">
            <h1>Learn More Section</h1>
            <CloseNextButton
              close={pageYOffset < 900}
              click={pageYOffset < 900 ? CloseHandler : NextHandler}
            />
          </div>
        );
      } else {
        return null;
      }
    }, [setPageToShow, setSilentScrollTo, learnMoreOn, pageYOffset]);

    return (
      <section className="section perfomance">
        <div
          className="perfomance__topContainer"
          style={{ background: `url(${Image})` }}
        >
          {renderTopContainer()}
        </div>
        <div className="perfomance__bottomContainer">
          {renderBottomContainer()}
        </div>
        {renderLearnMoreSection()}
      </section>
    );
  }
);
