import React, { useState, useEffect, useRef, useCallback } from "react";

import Video from "../../static/videos/ModelS/Range.mp4";
import VideoMobile from "../../static/videos/ModelS/RangeMobile.mp4";

/* Redux */
import { connect } from "react-redux";
import { setPageToShow, setSilentScrollTo } from "../../static/store/actions";
import InfoElement from "./InfoElement";
import SideComponents from "./SideComponents";
import ContentElement from "./ContentElement";

const mapStateToProps = (state) => ({
  pageIndex: state.models.pageIndex,
  pageYOffset: state.page.pageYOffset,
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
    width,
    height,
    phoneLayout,
    showSection,
  }) => {
    // const [showLearnMore, setShowLearnMore] = useState(false);
    const videoRef = useRef(null);
    const [showLearnMore, setShowLearnMore] = useState(false);

    /* Get section offset, used for Animation on small screens  */
    const sectionRef = useRef(null);
    const learnMoreSectionRef = useRef(null);
    const [sectionTop, setSectionTop] = useState(null);
    // const [learnMoreSectionTop, setLearnMoreSectionTop] = useState(null);
    // const [learnMoreSectionBottom, setLearnMoreSectionBottom] = useState(null);

    useEffect(() => {
      const getAndShowTop = () => {
        const rectSection = sectionRef.current.getBoundingClientRect();
        // const rectLearnMoreSection = learnMoreSectionRef.current?.getBoundingClientRect();
        setSectionTop(rectSection.top);
        // setLearnMoreSectionTop(rectLearnMoreSection.top);
        // setLearnMoreSectionBottom(rectLearnMoreSection.bottom);
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

      const learnMoreHandler = () => {
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
          <ContentElement horizontal={width <= 1200}>
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
          </ContentElement>

          <SideComponents
            title="Go Anywhere"
            subtitle="Range"
            paragraph="Model S can get you anywhere you want to go—withindustry-leading range and convenient charging options, allover the world."
            customClassNames="range__sideComponent"
            customInnerContainerClassNames="range__sideInnerContainer"
            horizontal={width <= 1200}
            checkRenderInfo={checkRenderInfo}
            learnMoreOn={learnMoreOn}
            showLearnMore={showLearnMore}
            learnMoreHandle={learnMoreHandler}
            showSection={showSection}
          />
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
      showSection,
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
