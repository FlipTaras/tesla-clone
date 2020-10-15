import React, { useState, useEffect, useRef, useCallback } from "react";
import LearnMoreButton from "../Buttons/LearnMoreButton";
import OrderButton from "../Buttons/OrderButton";
import CloseNextButton from "../Buttons/CloseNextButton";
import classnames from "classnames";

import Video from "../../static/videos/ModelS/Range.mp4";
import VideoMobile from "../../static/videos/ModelS/RangeMobile.mp4";

/* Redux */
import { connect } from "react-redux";
import { setPageToShow, setSilentScrollTo } from "../../static/store/actions";
import InfoElement from "./InfoElement";

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
    rightContainerRangeRef,
    pageYOffset,
    stopAnimation,
    width,
    height,
    phoneLayout,
  }) => {
    const [showLearnMore, setShowLearnMore] = useState(false);
    const videoRef = useRef(null);

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

    // useEffect(() => {
    //   if (videoRef.current) {
    //     videoRef.current.play();
    //   }
    // }, []);

    /* Scroll Learn more page into view */
    useEffect(() => {
      if (learnMoreOn) {
        window.scrollTo({
          top: learnMoreSectionRef.current?.offsetTop,
          behavior: "smooth",
        });
      }
    }, [learnMoreOn, height]);

    const renderSection = useCallback(() => {
      const videoElement = (
        <video
          preload="auto"
          muted
          autoPlay
          playsInline
          loop
          className="range__video"
          ref={videoRef}
        >
          <source src={width > 800 ? Video : VideoMobile} type="video/mp4" />
        </video>
      );
      const checkRenderInfo =
        pageIndex === "3" || (phoneLayout && sectionTop <= 600);

      const LearnMoreHandler = () => {
        if (!phoneLayout) {
          setPageToShow("range");
        } else {
          setShowLearnMore(true);
          window.scrollTo({
            top: learnMoreSectionRef.current?.offsetTop,
            behavior: "smooth",
          });
        }
      };

      return (
        <>
          <div className="range__leftContainer">
            <div className="range__infoElements">
              {checkRenderInfo && (
                <>
                  <InfoElement
                    // smaller
                    title="402mi"
                    learnMoreOn={learnMoreOn}
                    customInfoElementClassNames="range__infoElement range__infoElement--1"
                    firstText={
                      width >= 1024
                        ? "Go anywhere with up to 402 miles"
                        : "Range"
                    }
                    secondText={
                      width >= 1024 ? "of range on a single charge" : ""
                    }
                    showLine
                    white
                  />
                  <InfoElement
                    // smaller
                    title="15min"
                    customInfoElementClassNames="range__infoElement range__infoElement--2"
                    firstText={
                      width >= 1024
                        ? "Recharge up to 163 miles in 15 minutes "
                        : "Recharge"
                    }
                    secondText={
                      width >= 1024
                        ? "at any Supercharger location"
                        : "163 Miles"
                    }
                    showLine
                    white
                  />
                  <InfoElement
                    // smaller
                    title="18,000+"
                    firstText={
                      width >= 1024
                        ? "Superchargers placed along well-"
                        : "Superchargers"
                    }
                    secondText={
                      width >= 1024 ? "traveled routes around the world" : ""
                    }
                    infoCustomClassNames
                    customInfoElementClassNames=" range__infoElement range__infoElement--3"
                    white
                  />
                </>
              )}
            </div>
            {phoneLayout ? videoElement : pageIndex === "3" && videoElement}
          </div>
          <div className="range__rightContainer">
            {checkRenderInfo && (
              <>
                {/* <div className="range__sectionInfo"> */}
                <h2 className="subtitle range__subtitle">Range</h2>
                <h1 className="title range__title"> Go Anywhere</h1>
                <p className="paragraph range__paragraph">
                  Model S can get you anywhere you want to go—with
                  industry-leading range and convenient charging options, all
                  over the world.
                </p>
                {/* </div> */}
                <div className="range__buttons">
                  <LearnMoreButton
                    classNames="range__learnMoreButton"
                    disabled={learnMoreOn || showLearnMore}
                    click={LearnMoreHandler}
                  />
                  <OrderButton classNames="range__orderButton" />
                </div>
              </>
            )}
          </div>
          <div
            className="range__learnMoreContainer"
            ref={learnMoreSectionRef}
          ></div>
        </>
      );
    }, [
      learnMoreOn,
      phoneLayout,
      setPageToShow,
      showLearnMore,
      pageIndex,
      sectionTop,
      width,
    ]);
    return (
      <section ref={sectionRef} className="section range">
        {phoneLayout ? (
          <div className="fp-tableCell">{renderSection()}</div>
        ) : (
          <>{renderSection()}</>
        )}
      </section>
    );
  }
);
