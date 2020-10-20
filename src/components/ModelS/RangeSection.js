import React, { useState, useEffect, useRef, useCallback } from "react";
import SideComponents from "./SideComponents";
import ContentElement from "./ContentElement";
import InfoElement from "./InfoElement";
import RangeMap from "./RangeMap";
import LearnMoreTitleContainer from "./LearnMoreTitleContainer";

import Video from "../../static/videos/ModelS/Range.mp4";
import VideoMobile from "../../static/videos/ModelS/RangeMobile.mp4";

/* Redux */
import { connect } from "react-redux";
import { setPageToShow, setSilentScrollTo } from "../../static/store/actions";

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
    const videoRef = useRef(null);
    const [showLearnMore, setShowLearnMore] = useState(false);
    const checkLearnMore = showLearnMore || learnMoreOn;

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
      /* Screen size check */
      const checkRenderInfo =
        pageIndex === "3" || (phoneLayout && sectionTop <= 600);

      /* Video Element */
      const videoElement = () => (
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

      /* Button logic */
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

      const infoElements = [
        {
          infoElementClassNames: "range__infoElements range__infoElements--1",
          subtitleClassNames: "range__subtitle--1",
          title: "402mi",
          subtitle:
            width > 1024
              ? "Go anywhere with up to 402 miles of range on a single charge"
              : "Range",
          showLine: true,
        },
        {
          infoElementClassNames: "range__infoElements range__infoElements--2",
          subtitleClassNames: "range__subtitle--2",
          title: "15min",
          subtitle:
            width > 1024
              ? "Recharge up to 163 miles in 15 minutes of range on a single charge"
              : "Recharge 163 miles",
          showLine: true,
        },
        {
          infoElementClassNames: "range__infoElements range__infoElements--3",
          subtitleClassNames: "range__subtitle--1",
          title: "18,000+",
          subtitle:
            width > 1024
              ? "Superchargers placed along well-traveled routes around the world"
              : "Superchargers",
          showLine: false,
        },
      ];

      const renderInfoElement = () => {
        return infoElements.map((el) => (
          <InfoElement
            customInfoElementClassNames={el.infoElementClassNames}
            customTitleClassNames={el.titleClassNames}
            customSubtitleClassNames={el.subtitleClassNames}
            key={el.title}
            title={el.title}
            svg={el.svg}
            subtitle={el.subtitle}
            showLine={el.showLine}
            white
          />
        ));
      };

      /* Render */
      return (
        <>
          <ContentElement horizontal={width <= 1200}>
            <div className="range__infoElementsContainer">
              {checkRenderInfo && renderInfoElement()}
            </div>
            {phoneLayout ? videoElement() : pageIndex === "3" && videoElement()}
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
        <div className="range__container">{renderSection()}</div>
        <div
          className={checkLearnMore ? "range__learnMoreContainer" : ""}
          ref={learnMoreSectionRef}
        >
          {checkLearnMore && (
            <div className="range__learnMoreInnerContainer">
              <LearnMoreTitleContainer
                customClassNames="range__learnMoreTitleContainer"
                title="Go Anywhere"
                paragraph="Experience the freedom of long-distance travel with convenient access to the Tesla global charging network."
              />
              <div className="range__learnMoreMapContainer">
                <>
                  <RangeMap />
                </>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
);
