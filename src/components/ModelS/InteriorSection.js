import React, { useState, useEffect, useRef, useCallback } from "react";

/* Elements */
import InfoElement from "./InfoElement";
import SideComponents from "./SideComponents";
import ContentElement from "./ContentElement";
import CloseNextButton from "../Buttons/CloseNextButton";
import LearnMoreTitleContainer from "./LearnMoreTitleContainer";
/* Images */
import Image from "../../static/images/ModelS/Interior/interior.jpg";
import Icon from "../../static/images/ModelS/Interior/wifi-icon.png";

/* Slider Images */
import Slider1 from "../../static/images/ModelS/Interior/Slider1.jpg";
import Slider1Mobile from "../../static/images/ModelS/Interior/Slider1Mobile.jpg";
import Slider2 from "../../static/images/ModelS/Interior/Slider2.jpg";
import Slider2Mobile from "../../static/images/ModelS/Interior/Slider2Mobile.jpg";
import Slider3 from "../../static/images/ModelS/Interior/Slider3.jpg";
import Slider3Mobile from "../../static/images/ModelS/Interior/Slider3Mobile.jpg";
import Slider4 from "../../static/images/ModelS/Interior/Slider4.jpg";
import Slider4Mobile from "../../static/images/ModelS/Interior/Slider4Mobile.jpg";

/* Better Slider Images */
import BetterSlider1 from "../../static/images/ModelS/Interior/BetterSlider1.jpg";
import BetterSlider1Mobile from "../../static/images/ModelS/Interior/BetterSlider1Mobile.jpg";
import BetterSlider2 from "../../static/images/ModelS/Interior/BetterSlider2.jpg";
import BetterSlider2Mobile from "../../static/images/ModelS/Interior/BetterSlider2Mobile.jpg";
import BetterSlider3 from "../../static/images/ModelS/Interior/BetterSlider3.jpg";
import BetterSlider3Mobile from "../../static/images/ModelS/Interior/BetterSlider3Mobile.jpg";
import BetterSlider4 from "../../static/images/ModelS/Interior/BetterSlider4.jpg";
import BetterSlider4Mobile from "../../static/images/ModelS/Interior/BetterSlider4Mobile.jpg";

/* Room Slider Images */
import RoomSlider1 from "../../static/images/ModelS/Interior/RoomSlider1.jpg";
import RoomSlider1Mobile from "../../static/images/ModelS/Interior/RoomSlider1Mobile.jpg";
import RoomSlider2 from "../../static/images/ModelS/Interior/RoomSlider2.jpg";
import RoomSlider2Mobile from "../../static/images/ModelS/Interior/RoomSlider2Mobile.jpg";
import RoomSlider3 from "../../static/images/ModelS/Interior/RoomSlider3.jpg";
import RoomSlider3Mobile from "../../static/images/ModelS/Interior/RoomSlider3Mobile.jpg";
import RoomSlider4 from "../../static/images/ModelS/Interior/RoomSlider4.jpg";
import RoomSlider4Mobile from "../../static/images/ModelS/Interior/RoomSlider4Mobile.jpg";

/* Roof Section Images */
import RoofImage from "../../static/images/ModelS/Interior/Roof.jpg";
import RoofMobileImage from "../../static/images/ModelS/Interior/RoofMobile.jpg";

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

        /* Render */
        return (
          <>
            <Slider
              slideContent="images"
              swipeSlider
              showInfo
              showButtons
              numberOfSlides={4}
              slidesData={slidesData}
              big
            />
          </>
        );
      };

      const renderBetter = () => {
        const slidesData = [
          {
            image: width <= 800 ? BetterSlider1Mobile : BetterSlider1,
            alt: "interior",
          },
          {
            image: width <= 800 ? BetterSlider2Mobile : BetterSlider2,
            alt: "interior",
          },
          {
            image: width <= 800 ? BetterSlider3Mobile : BetterSlider3,
            alt: "interior",
          },
          {
            image: width <= 800 ? BetterSlider4Mobile : BetterSlider4,
            alt: "interior",
          },
        ];

        const bigButtonsData = [
          {
            title: "Media",
            text:
              "FM radio and Bluetooth® connectivity, with on-demand & internet radio capability",
            showBorder: true,
            smaller: true,
            white: true,
          },
          {
            title: "Navigation",
            text:
              "Smart routing that automatically adjusts to real-time traffic conditions",
            showBorder: false,
            smaller: true,
            white: true,
          },
          {
            title: "Controls",
            text:
              "Personalized drive settings, climate controls and cabin controls",
            showBorder: false,
            smaller: true,
            white: true,
          },
          {
            title: "Energy",
            text: "Real-time energy consumption and range estimation",
            showBorder: false,
            smaller: true,
            white: true,
          },
        ];

        /* Render */
        return (
          <>
            <LearnMoreTitleContainer
              customClassNames="interior__titleContainer--2"
              white
              title="Better Over Time"
              paragraph="Access everything on the expansive 17-inch touchscreen — designed to improve over time with regular software updates, introducing new features, functionality and performance."
            />
            <Slider
              slideContent="images"
              numberOfSlides={4}
              slidesData={slidesData}
              showButtons
              opacitySlider
              bigButtonsData={bigButtonsData}
              big
            />
          </>
        );
      };

      const renderRoom = () => {
        const slidesData = [
          {
            image: width <= 800 ? RoomSlider1Mobile : RoomSlider1,
            alt: "interior",
          },
          {
            image: width <= 800 ? RoomSlider2Mobile : RoomSlider2,
            alt: "interior",
          },
          {
            image: width <= 800 ? RoomSlider3Mobile : RoomSlider3,
            alt: "interior",
          },
          {
            image: width <= 800 ? RoomSlider4Mobile : RoomSlider4,
            alt: "interior",
          },
        ];

        const bigButtonsData = [
          {
            title: "Max Space",
            text: "Seats fold flat for all the space you need",
            showTopBorder: true,
            showBorder: true,
            longer: true,
            white: true,
          },
          {
            title: "Luggage",
            text: "Carry all your things, anywhere you go",
            showTopBorder: true,
            showBorder: false,
            longer: true,
            white: true,
          },
          {
            title: "Bike",
            text: "Fit your bike in the back, with the wheels on",
            showTopBorder: true,
            showBorder: false,
            longer: true,
            white: true,
          },
          {
            title: "Snowboard",
            text: "Go on an adventure with the whole family",
            showTopBorder: true,
            showBorder: false,
            longer: true,
            white: true,
          },
        ];

        /* Render */
        return (
          <>
            <LearnMoreTitleContainer
              white
              customClassNames="interior__titleContainer--3"
              title="Room For Everything"
              paragraph="Model S has best in class storage and fold-flat seats, providing more space than most SUVs. You can fit anything you want to bring—like a bike with the wheels on, or luggage for every passenger."
            />
            <Slider
              slideContent="images"
              bigButtonsData={bigButtonsData}
              numberOfSlides={4}
              opacitySlider
              slidesData={slidesData}
              big
            />
          </>
        );
      };

      const renderGlassRoof = () => {
        return (
          <section className="interior__roof">
            <div className="interior__roofInner">
              <LearnMoreTitleContainer
                customClassNames="interior__titleContainer--4"
                customParagraphClassNames="interior__paragraph--4"
                white
                title="Glass Roof"
                paragraph="The standard, expansive Glass Roof in Model S provides passengers with a brighter, more spacious experience—and a seamless view of the sky."
              />
              <picture className="interior__roofImage">
                <source media="(min-width: 801px)" srcSet={RoofImage}></source>
                <source
                  media="(max-width: 800px)"
                  srcSet={RoofMobileImage}
                ></source>
                <img alt="" />
              </picture>
            </div>
          </section>
        );
      };

      const renderPremiumInterior = () => {};

      /* Render */
      if (checkLearnMore) {
        return (
          <>
            <div className="interior__learnMoreInnerContainer">
              {renderSlider()}
              {renderBetter()}
              {renderRoom()}
              {renderGlassRoof()}
              {renderPremiumInterior()}
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
        return infoElements.map((el, i) => (
          <InfoElement
            key={i}
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
