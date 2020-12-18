import React, { useState, useEffect, useRef, useCallback } from "react";
import InfoElement from "./InfoElement";
import ContentElement from "./ContentElement";
import SideComponents from "./SideComponents";
import Slider from "../../components/ModelS/Slider";

import Icon5 from "../../static/images/ModelS/Exterior/5Icon.png";
import cdIcon from "../../static/images/ModelS/Exterior/cdIcon.png";
import carIcon from "../../static/images/ModelS/Exterior/carIcon.png";

import Image from "../../static/images/ModelS/Exterior/extrerior.jpg";
import ImagePortrait from "../../static/images/ModelS/Exterior/exterior-portrait.jpg";
import ImageMobile from "../../static/images/ModelS/Exterior/exterior-mobile.jpg";

/* Slider */
import Slider1 from "../../static/images/ModelS/Exterior/Slider1Black.jpg";
import Slider2 from "../../static/images/ModelS/Exterior/Slider1Blue.jpg";
import Slider3 from "../../static/images/ModelS/Exterior/Slider1Silver.jpg";
import Slider4 from "../../static/images/ModelS/Exterior/Slider1Red.jpg";
import SliderLeft from "../../static/images/ModelS/Exterior/Slider1Left.jpg";
import SliderRight from "../../static/images/ModelS/Exterior/Slider1Right.jpg";

/* Redux */
import { connect } from "react-redux";
import { setPageToShow, setSilentScrollTo } from "../../static/store/actions";
import CloseNextButton from "../Buttons/CloseNextButton";

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
    const checkLearnMore = showLearnMore || learnMoreOn;

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

    /* Learn more render */
    const renderLearnMoreSection = useCallback(() => {
      /* Close button functionality */
      const renderCloseButton = () => {
        /* Buttons logic */
        const CloseHandler = () => {
          if (!phoneLayout) {
            setPageToShow(null);
            setSilentScrollTo("exterior");
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
          setSilentScrollTo("specs");
        };

        const closeButtonElement = (
          <CloseNextButton
            close={
              phoneLayout
                ? true
                : learnMoreSectionBottom - 200 > height
                ? true
                : false
            }
            click={
              phoneLayout
                ? CloseHandler
                : learnMoreSectionBottom - 200 > height
                ? CloseHandler
                : NextHandler
            }
          />
        );

        if (
          learnMoreSectionTop < height - 20 &&
          learnMoreSectionBottom >= height
        ) {
          return closeButtonElement;
        } else {
          return null;
        }
      };

      /* First Slider */
      const renderSlider = () => {
        const slidesData = [
          {
            image: Slider1,
            alt: "interior",
          },
          {
            image: Slider2,
            alt: "interior",
          },
          {
            image: Slider3,

            alt: "interior",
          },
          {
            image: Slider4,

            alt: "interior",
          },
        ];

        /* Render */
        return (
          <Slider
            slideContent="images"
            opacitySlider
            showInfo
            showButtons
            numberOfSlides={5}
            slidesData={slidesData}
            noAuto
            fullWidth
            big
            sliderCustomClassNames="exterior__slider1"
          />
        );
      };

      /* Render */
      if (checkLearnMore) {
        return (
          <>
            <div className="exterior__learnMoreInnerContainer">
              <div>{renderSlider()}</div>
            </div>
            {renderCloseButton()}
          </>
        );
      }
    }, [
      height,
      phoneLayout,
      setPageToShow,
      setSilentScrollTo,
      learnMoreSectionBottom,
      learnMoreSectionTop,
      checkLearnMore,
    ]);

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
          setPageToShow("exterior");
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
        return infoElements.map((el, i) => (
          <InfoElement
            customInfoElementClassNames={el.infoElementClassNames}
            customTitleClassNames={el.titleClassNames}
            customSubtitleClassNames={el.subtitleClassNames}
            customTitleSmallClassNames={el.smallTitleClassNames}
            key={i}
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
          <div className="exterior__container">
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
              disabled
            />
          </div>
          <div
            ref={learnMoreSectionRef}
            className={checkLearnMore ? "exterior__learnMoreContainer" : ""}
          >
            {renderLearnMoreSection()}
          </div>
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
      checkLearnMore,
      renderLearnMoreSection,
    ]);

    return (
      <section ref={sectionRef} className="section exterior">
        {renderSection()}
      </section>
    );
  }
);
