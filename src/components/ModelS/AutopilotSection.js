import React, { useState, useEffect, useRef, useCallback } from "react";
// import CloseNextButton from "../Buttons/CloseNextButton";
// import classnames from "classnames";

import Video from "../../static/videos/ModelS/autopilot.mp4";
import VideoMobile from "../../static/videos/ModelS/autopilot mobile.mp4";
import Icon from "../../static/images/ModelS/Autopilot/12Icon.png";
import InfoElement from "./InfoElement";

/* Redux */
import { connect } from "react-redux";
import { setPageToShow, setSilentScrollTo } from "../../static/store/actions";
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
    pageYOffset,
    width,
    height,
    phoneLayout,
    showSection,
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

    /* Render functionality */
    const renderSection = useCallback(() => {
      /* Check when section to show up */
      const checkRenderInfo =
        pageIndex === "4" || (phoneLayout && sectionTop <= 600);

      /* Button logic */
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

      /* Video Element */
      const videoElement = (
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
      );

      /* Info Elements */
      const infoElements = [
        {
          infoElementClassNames:
            "autopilot__infoElements autopilot__infoElements--1",
          title: "360°",
          subtitleClassNames: "autopilot__subtitle autopilot__subtitle--1",
          subtitle:
            width > 1024
              ? "Rear, side and forward-facing cameras provide maximum visibility"
              : "Degrees of Visibility",
          showLine: true,
        },
        {
          infoElementClassNames:
            "autopilot__infoElements autopilot__infoElements--2",
          title: "160m",
          subtitleClassNames: "autopilot__subtitle autopilot__subtitle--2",

          subtitle:
            width > 1024
              ? "Forward-facing radar provides a long-range view of distant objects"
              : "Of forward protection",
          showLine: true,
        },
        {
          infoElementClassNames:
            "autopilot__infoElements autopilot__infoElements--3",
          smallTitleClassNames: "autopilot__smallTitle--3",
          image: Icon,
          titleSmall: "Ultrasonic Sensors",
          subtitleClassNames: "autopilot__subtitle autopilot__subtitle--3",

          subtitle:
            width > 1024
              ? "Detects nearby cars, prevents potential collisions and assists with parking"
              : "Ultrasonic Sensors",
          showLine: false,
        },
      ];

      const renderInfoElement = () => {
        return infoElements.map((el) => (
          <InfoElement
            key={el.title}
            customInfoElementClassNames={el.infoElementClassNames}
            customTitleClassNames={el.titleClassNames}
            customSubtitleClassNames={el.subtitleClassNames}
            customTitleSmallClassNames={el.smallTitleClassNames}
            title={el.title}
            svg={el.svg}
            subtitle={el.subtitle}
            image={el.image}
            titleSmall={width > 1024 && el.titleSmall}
            showLine={el.showLine}
            lineBottom={width > 1024}
          />
        ));
      };

      /* Render */
      return (
        <>
          <ContentElement
            customContentElementClassNames="autopilot__contentElement"
            horizontal={true}
          >
            <div className="autopilot__infoElementsContainer">
              {checkRenderInfo && renderInfoElement()}
            </div>
            {phoneLayout ? videoElement : pageIndex === "4" && videoElement}
          </ContentElement>
          <SideComponents
            title="Future of Driving"
            subtitle="Autopilot"
            paragraph="Autopilot advanced safety and convenience features aredesigned to assist you with the most burdensome parts ofdriving."
            horizontal={true}
            checkRenderInfo={checkRenderInfo}
            learnMoreOn={learnMoreOn}
            showLearnMore={showLearnMore}
            learnMoreHandle={learnMoreHandler}
            showSection={showSection}
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
      showSection,
    ]);
    return (
      <section ref={sectionRef} className="section autopilot">
        <div className="autopilot__container">{renderSection()}</div>
      </section>
    );
  }
);
