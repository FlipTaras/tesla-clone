import React, { useState, useEffect, useRef, useCallback } from "react";
import InfoElement from "./InfoElement";
import ContentElement from "./ContentElement";
import SideComponents from "./SideComponents";

import Icon5 from "../../static/images/ModelS/Exterior/5Icon.png";
import cdIcon from "../../static/images/ModelS/Exterior/cdIcon.png";
import carIcon from "../../static/images/ModelS/Exterior/carIcon.png";

import Image from "../../static/images/ModelS/Exterior/extrerior.jpg";
import ImagePortrait from "../../static/images/ModelS/Exterior/exterior-portrait.jpg";
import ImageMobile from "../../static/images/ModelS/Exterior/exterior-mobile.jpg";

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
    pageYOffset,
    width,
    height,
    phoneLayout,
    showSection,
  }) => {
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
        pageIndex === "6" || (phoneLayout && sectionTop <= 600);

      /* Screen size check */
      const portraitImageCheck = height >= 1150 && width <= 1500;

      /* Button logic */
      const learnMoreHandler = () => {
        if (!phoneLayout) {
          setPageToShow("interior");
        } else {
          setShowLearnMore(true);
          window.scrollTo({
            top: learnMoreSectionRef.current?.offsetTop,
            behavior: "smooth",
          });
        }
      };

      /* Info Elements */
      const infoElements = [
        {
          infoElementClassNames:
            "exterior__infoElements exterior__infoElements--1",
          titleSmall: "Signature Colors",
          smallTitleClassNames: "exterior__smallTitle",

          image: Icon5,
          subtitleClassNames: "exterior__subtitle exterior__subtitle--1",
          subtitle:
            width > 1024
              ? "Customize Model S with signature, multi-layered paint"
              : "Signature Colors",
          showLine: true,
        },
        {
          infoElementClassNames:
            "exterior__infoElements exterior__infoElements--2",
          subtitleClassNames: "exterior__subtitle exterior__subtitle--2",
          smallTitleClassNames: "exterior__smallTitle",

          image: cdIcon,
          title: "0.23",
          subtitle:
            width > 1024
              ? "The most aerodynamic car in its class with the lowest drag coefficient on earth"
              : "Lowest Drag Coefficient",
          showLine: true,
        },
        {
          infoElementClassNames:
            "exterior__infoElements exterior__infoElements--3",
          smallTitleClassNames: "exterior__smallTitle",
          titleSmall: "Roof Rack Compatible",
          subtitleClassNames: "exterior__subtitle exterior__subtitle--3",
          image: carIcon,
          subtitle:
            width > 1024
              ? "A standard, expansive Glass Roof provides more headroom and UV protection"
              : "Roof Pack Compatible",
          showLine: false,
        },
      ];

      const renderInfoElement = () => {
        return infoElements.map((el) => (
          <InfoElement
            customInfoElementClassNames={el.infoElementClassNames}
            customTitleClassNames={el.titleClassNames}
            customSubtitleClassNames={el.subtitleClassNames}
            customTitleSmallClassNames={el.smallTitleClassNames}
            key={el.title}
            title={el.title}
            svg={el.svg}
            subtitle={el.subtitle}
            image={el.image}
            titleSmall={width > 1024 && el.titleSmall}
            showLine={el.showLine}
          />
        ));
      };

      /* Render */
      return (
        <>
          <ContentElement
            horizontal={true}
            customContentElementClassNames={
              width > 815
                ? "exterior__contentElement"
                : "exterior__contentElement--small"
            }
          >
            <div className="exterior__infoElementsContainer">
              {checkRenderInfo && renderInfoElement()}
            </div>
            <img
              className="exterior__backgroundImage"
              src={
                portraitImageCheck
                  ? ImagePortrait
                  : width <= 1024
                  ? ImageMobile
                  : Image
              }
              alt="interior"
            />
          </ContentElement>
          <SideComponents
            title="Designed for Efficiency"
            subtitle="Exterior"
            paragraph="Model S was designed for speed and endurance—with incredible aerodynamics, ludicrous performance and uncompromised aesthetics. Automatic door handles auto-present upon approach and withdraw when closed."
            titleCustomClassNames="exterior__sideComponentTitle"
            horizontal={true}
            checkRenderInfo={checkRenderInfo}
            learnMoreOn={learnMoreOn}
            showLearnMore={showLearnMore}
            learnMoreHandle={learnMoreHandler}
            showSection={showSection}
          />
          <div
            ref={learnMoreSectionRef}
            className="exterior__learnMoreContainer"
          ></div>
        </>
      );
    }, [
      pageIndex,
      phoneLayout,
      sectionTop,
      setPageToShow,
      width,
      learnMoreOn,
      showLearnMore,
      showSection,
      height,
    ]);

    return (
      <section className="section exterior">
        <div className="exterior__container">{renderSection()}</div>
      </section>
    );
  }
);
