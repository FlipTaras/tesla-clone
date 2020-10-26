import React, { useState, useEffect, useRef, useCallback } from "react";

/* Elements */
import InfoElement from "./InfoElement";
import SideComponents from "./SideComponents";
import ContentElement from "./ContentElement";
import CloseNextButton from "../Buttons/CloseNextButton";

/* Images */
import Image from "../../static/images/ModelS/Interior/interior.jpg";
import Icon from "../../static/images/ModelS/Interior/wifi-icon.png";

// /* Slider Images */
import Slider1 from "../../static/images/ModelS/Interior/Slider1.jpg";
import Slider1Mobile from "../../static/images/ModelS/Interior/Slider1Mobile.jpg";
import Slider2 from "../../static/images/ModelS/Interior/Slider2.jpg";
import Slider2Mobile from "../../static/images/ModelS/Interior/Slider2Mobile.jpg";
import Slider3 from "../../static/images/ModelS/Interior/Slider3.jpg";
import Slider3Mobile from "../../static/images/ModelS/Interior/Slider3Mobile.jpg";
import Slider4 from "../../static/images/ModelS/Interior/Slider4.jpg";
import Slider4Mobile from "../../static/images/ModelS/Interior/Slider4Mobile.jpg";

/* Redux */
import { connect } from "react-redux";
import { setPageToShow, setSilentScrollTo } from "../../static/store/actions";
import Slider from "./Slider";

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

    /* Render functionality */

    const renderLearnMoreSection = useCallback(() => {
      const renderCloseButton = () => {
        /* Buttons logic */
        const CloseHandler = () => {
          if (!phoneLayout) {
            setPageToShow(null);
            setSilentScrollTo("interior");
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
          setSilentScrollTo("exterior");
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

      const renderSlider = () => {
        const slidesData = [
          {
            paragraph:
              "The front of Model S is extended forward, where an engine would be—providing an extremely spacious front row experience.",
            image: width <= 800 ? Slider1Mobile : Slider1,
            alt: "interior",
          },
          {
            paragraph:
              "Model S has two driver displays—a central 17-inch touchscreen, and a second screen located behind the steering wheel.",
            image: width <= 800 ? Slider2Mobile : Slider2,
            alt: "interior",
          },
          {
            paragraph:
              "With the front row forward, the back seat is extremely spacious, providing a comfortable driving experience for every passenger.",
            image: width <= 800 ? Slider3Mobile : Slider3,
            alt: "interior",
          },
          {
            paragraph:
              "A second trunk in the front provides extra cargo room, for all your things.",
            image: width <= 800 ? Slider4Mobile : Slider4,
            alt: "interior",
          },
        ];
        return (
          <>
            <Slider numberOfSlides={4} slidesData={slidesData} />
            <div className="homework">Something</div>
          </>
        );
      };

      /* Render */
      if (checkLearnMore) {
        return (
          <>
            <div className="interior__learnMoreInnerContainer">
              {renderSlider()}
            </div>
            {renderCloseButton()}
          </>
        );
      }
    }, [
      height,
      learnMoreSectionBottom,
      learnMoreSectionTop,
      phoneLayout,
      setPageToShow,
      setSilentScrollTo,
      checkLearnMore,
      width,
    ]);

    const renderSection = useCallback(() => {
      /* Check when section to show up */
      const checkRenderInfo =
        pageIndex === "5" || (phoneLayout && sectionTop <= 600);

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
            "autopilot__infoElements autopilot__infoElements--1",
          title: "17inch",
          subtitleClassNames: "autopilot__subtitle autopilot__subtitle--1",
          subtitle:
            width > 1024
              ? "An expansive touchscreen display designed to improve over time"
              : "Touchscreen Display",
          showLine: true,
        },
        {
          infoElementClassNames:
            "autopilot__infoElements autopilot__infoElements--2",
          subtitleClassNames: "autopilot__subtitle autopilot__subtitle--2",
          image: Icon,

          subtitle:
            width > 1024
              ? "Over-the-air software updates introduce new features, functionality and performance"
              : "Over-the-air Software Updates",
          showLine: true,
        },
        {
          infoElementClassNames:
            "autopilot__infoElements autopilot__infoElements--3",
          smallTitleClassNames: "autopilot__smallTitle--3",
          title: "28cu ft",
          subtitleClassNames: "autopilot__subtitle autopilot__subtitle--3",

          subtitle:
            width > 1024
              ? "Best in class storage, with more cargo room than most SUVs"
              : "Best in Class Storage",
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
            lineBottom={width > 1024}
            white
          />
        ));
      };

      /* Render */
      return (
        <>
          <ContentElement
            customContentElementClassNames="interior__contentElement"
            horizontal={true}
          >
            <div className="interior__infoElementsContainer">
              {checkRenderInfo && renderInfoElement()}
            </div>
            <img
              className="interior__backgroundImage"
              src={Image}
              alt="interior"
            />
          </ContentElement>
          <SideComponents
            title="Built Around the Driver"
            subtitle="Interior"
            paragraph="Model S is built with best in class storage, seating for up to five adults and an expansive 17-inch touchscreen. Advanced noise engineering creates sound dynamics comparable to a recording studio, while the standard Glass Roof provides a spacious interior experience for every passenger."
            horizontal={true}
            checkRenderInfo={checkRenderInfo}
            learnMoreOn={learnMoreOn}
            showLearnMore={showLearnMore}
            learnMoreHandle={learnMoreHandler}
            showSection={showSection}
          />
          <div
            ref={learnMoreSectionRef}
            className={checkLearnMore ? "interior__learnMoreContainer" : ""}
          >
            {renderLearnMoreSection()}
          </div>
        </>
      );

      /* Render */
    }, [
      pageIndex,
      checkLearnMore,
      renderLearnMoreSection,
      phoneLayout,
      sectionTop,
      setPageToShow,
      width,
      learnMoreOn,
      showSection,
      showLearnMore,
    ]);
    return (
      <section ref={sectionRef} className="section interior">
        <div className="interior__container">{renderSection()}</div>
      </section>
    );
  }
);
