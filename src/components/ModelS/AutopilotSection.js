import React, { useState, useEffect, useRef, useCallback } from "react";
// import CloseNextButton from "../Buttons/CloseNextButton";
// import classnames from "classnames";

import Video from "../../static/videos/ModelS/autopilot.mp4";
import VideoMobile from "../../static/videos/ModelS/autopilot mobile.mp4";

/* Redux */
import { connect } from "react-redux";
import { setPageToShow, setSilentScrollTo } from "../../static/store/actions";
import SideComponents from "./SideComponents";
// import InfoElement from "./InfoElement";

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
      const checkRenderInfo =
        pageIndex === "4" || (phoneLayout && sectionTop <= 600);

      const learnMoreHandler = () => {
        if (!phoneLayout) {
          setPageToShow("autopilot");
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
          <div className="autopilot__topContainer">
            <video
              preload="auto"
              muted
              autoPlay
              playsInline
              loop
              className="autopilot__video"
              ref={videoRef}
            >
              <source
                src={width > 800 ? Video : VideoMobile}
                type="video/mp4"
              ></source>
            </video>
          </div>
          <SideComponents
            title="Future of Driving"
            subtitle="Autopilot"
            paragraph="Autopilot advanced safety and convenience features aredesigned to assist you with the most burdensome parts ofdriving."
            // customClassNames="range__sideComponent"
            horizontal={true}
            checkRenderInfo={checkRenderInfo}
            learnMoreOn={learnMoreOn}
            showLearnMore={showLearnMore}
            learnMoreHandle={learnMoreHandler}
            // showSection={showSection}
          />
          <div
            ref={learnMoreSectionRef}
            className="autopilot__learnMoreContainer"
          ></div>
        </>
      );
    }, [
      width,
      pageIndex,
      phoneLayout,
      sectionTop,
      learnMoreOn,
      setPageToShow,
      showLearnMore,
    ]);
    return (
      <section ref={sectionRef} className="section">
        {phoneLayout ? (
          <div className="fp-tableCell">{renderSection()}</div>
        ) : (
          <>{renderSection()}</>
        )}
      </section>
    );
  }
);
