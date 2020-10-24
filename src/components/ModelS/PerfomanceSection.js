import React, { useCallback, useEffect, useRef, useState } from "react";
import InfoElement from "./InfoElement";
import CountUp from "react-countup";
import CloseNextButton from "../Buttons/CloseNextButton";
import VideoButton from "./VideoButton";

/* Redux */
import { connect } from "react-redux";
import { setPageToShow, setSilentScrollTo } from "../../static/store/actions";

/* Videos and Posters Imports */
import Image from "../../static/images/ModelS/Perfomance/model-s-performance.jpg";
import ImageLand from "../../static/images/ModelS/Perfomance/model-s-performance-portrait.jpg";
import imagePhone from "../../static/images/ModelS/Perfomance/model-s-performance-mobile.jpg";
import Poster1 from "../../static/images/ModelS/Perfomance/dualmotor_desktop_poster.png";
import Poster2 from "../../static/images/ModelS/Perfomance/performancemotor_desktop_poster.png";
import Poster3 from "../../static/images/ModelS/Perfomance/total-control-s-poster.png";

import Video3 from "../../static/videos/ModelS/KD8BAH_total-control-s_0.mp4-2000_M3C5DL.mp4";
import Video2 from "../../static/videos/ModelS/performancemotor_desktop.mp4";
import Video1 from "../../static/videos/ModelS/dualmotor_desktop.mp4";
import SideComponents from "./SideComponents";
import ContentElement from "./ContentElement";
import LearnMoreTitleContainer from "./LearnMoreTitleContainer";
import LearnMoreVideoTextContainer from "./LearnMoreVideoTextContainer";

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
    showSection,
    width,
    height,
    phoneLayout,
  }) => {
    const [showLearnMore, setShowLearnMore] = useState(false);
    const checkLearnMore = showLearnMore || learnMoreOn;
    const [activeButton, setActiveButton] = useState(1);

    /* Video Buttons Container Animation */
    const [containerPosition, setContainerPosition] = useState("0");
    useEffect(() => {
      switch (activeButton) {
        case 1:
          if (width <= 350) {
            setContainerPosition("15rem");
          } else if (width <= 600) {
            setContainerPosition("10rem");
          } else {
            setContainerPosition("0");
          }
          break;
        case 2:
          if (width <= 600) {
            setContainerPosition("-20rem");
          } else if (width <= 812) {
            setContainerPosition("-12rem");
          }
          break;

        default:
          setContainerPosition("0");
          break;
      }
    }, [activeButton, width]);

    /* Different Checks of screen size */
    const checkIpad = height <= 1366 && width <= 1024;

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
                : showSection
                ? "rotate(170 30 40)"
                : ""
            }
          >
            {learnMoreOn ? null : showSection ? null : (
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

      /* CountUp Element */
      const countUpElement = (
        <CountUp
          delay={learnMoreOn ? 0 : showSection ? 0 : 1}
          start={learnMoreOn ? 2.3 : showSection ? 2.3 : 0}
          end={2.3}
          duration={3}
          suffix={"s"}
          decimals={1}
          useEasing
        />
      );

      /* Info Elements Settings */
      const infoElements = [
        {
          infoElementClassNames:
            "perfomance__infoElements perfomance__infoElements--1",
          title: "AWD",
          subtitle:
            width > 1024
              ? "Dual Motor All-Wheel Drive instantly controls traction and torque, in all weather conditions"
              : "Standart All-Wheel Drive",
          showLine: true,
        },
        {
          infoElementClassNames:
            "perfomance__infoElements perfomance__infoElements--2",
          subtitleClassNames: "perfomance__subtitle--2",
          titleClassNames: "perfomance__infoTitle--2",
          svg: svgSpeed,
          title: countUpElement,
          subtitle:
            width > 1024
              ? "The quickest acceleration on earth—from zero to 60 mph in as little as 2.3 seconds"
              : "From 0-60mph",
          showLine: true,
        },
        {
          infoElementClassNames:
            "perfomance__infoElements perfomance__infoElements--3",
          title: "163mph",
          subtitle:
            width > 1024
              ? "Improved handling and aerodynamics allow for a top speed of 163 mph"
              : "Top Speed",
        },
      ];

      const renderInfoElement = () => {
        return infoElements.map((el) => (
          <InfoElement
            customInfoElementClassNames={el.infoElementClassNames}
            customSubtitleClassNames={el.subtitleClassNames}
            customTitleClassNames={el.titleClassNames}
            key={el.title}
            title={el.title}
            svg={el.svg}
            subtitle={el.subtitle}
            showLine={el.showLine}
            white
            showSection={showSection}
          />
        ));
      };

      /* Render */
      if (pageIndex === "2" || (phoneLayout && sectionTop <= 600)) {
        return (
          <div className="perfomance__infoElementsContainer">
            {renderInfoElement()}
          </div>
        );
      } else {
        return null;
      }
    }, [pageIndex, learnMoreOn, showSection, width, phoneLayout, sectionTop]);

    const renderLearnMoreSection = useCallback(() => {
      /* Buttons Logic */
      const CloseHandler = () => {
        if (!phoneLayout) {
          setPageToShow(null);
          setSilentScrollTo("perfomance");
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
        setSilentScrollTo("range");
      };

      const closeButtonElement = (
        <CloseNextButton
          close={phoneLayout ? true : pageYOffset < 1550}
          click={
            phoneLayout
              ? CloseHandler
              : pageYOffset < 1550
              ? CloseHandler
              : NextHandler
          }
        />
      );
      const renderCloseButton = () => {
        if (
          learnMoreSectionTop < height - 20 &&
          learnMoreSectionBottom >= height
        ) {
          return closeButtonElement;
        } else {
          return null;
        }
      };

      /* Video Buttons Content */
      const buttons1 = [
        {
          buttonTitle: "3.7s",
          buttonFirstText: "0-60",
          buttonSecondtext: "mph",
        },
        {
          buttonTitle: "402",
          buttonFirstText: "mile",
          buttonSecondtext: "range",
        },
      ];

      const buttons2 = [
        {
          buttonTitle: "2.3s",
          buttonFirstText: "0-60",
          buttonSecondtext: "mph",
        },
        {
          buttonTitle: "348",
          buttonFirstText: "mile",
          buttonSecondtext: "range",
        },
      ];

      const videoButtons = [
        {
          title: "Long Range Plus",
          text: "Premium option with all-wheel drive and longest range",
          buttons: buttons1,
          showBorder: true,
        },
        {
          title: "Perfomance",
          text:
            "Perfomance option with all-wheel drive and ludicrous acceleration",
          buttons: buttons2,
          showBorder: false,
        },
      ];

      /* Render Video Elements */
      const renderVideoElement = () => {
        return (
          <>
            <video
              playsInline
              className={
                activeButton === 1
                  ? "perfomance__video perfomance__video--active"
                  : "perfomance__video "
              }
              preload="auto"
              loop
              muted
              poster={Poster1}
              autoPlay
            >
              <source src={Video1} type="video/mp4" />
            </video>
            );
            <video
              playsInline
              className={
                activeButton === 2
                  ? "perfomance__video perfomance__video--active"
                  : "perfomance__video "
              }
              preload="auto"
              loop
              muted
              poster={Poster2}
              autoPlay
            >
              <source src={Video2} type="video/mp4" />
            </video>
          </>
        );
      };

      /* Render */
      if (learnMoreOn || showLearnMore) {
        return (
          <>
            <div className="perfomance__learnMoreInner">
              <LearnMoreTitleContainer
                title="Electric Powertrain"
                paragraph="The all-electric powertrain and low center of gravity providethe best performance, range and efficiency."
              />
              <div className="perfomance__videosContainer">
                {renderVideoElement()}
              </div>
              <div
                style={{
                  marginLeft: containerPosition,
                }}
                className="perfomance__videoButtons"
              >
                {videoButtons.map((el, i) => (
                  <VideoButton
                    key={i}
                    title={el.title}
                    text={el.text}
                    buttons={el.buttons}
                    showBorder={el.showBorder}
                    click={() => setActiveButton(i + 1)}
                    active={activeButton === i + 1}
                    activeButton={activeButton}
                  />
                ))}
              </div>
            </div>
            <LearnMoreVideoTextContainer
              customTitleClassNames="perfomance__videoTextContainerTitle"
              paragraph="Only Tesla has the technology that provides dual motors with independent traction to both front and rear wheels for unparalleled control, in all weather conditions. As a result, Model S instantly controls traction and torque to every wheel, with a unique and superior all-wheel drive system."
              title="Dual Motor All-Wheel Drive"
              video={Video3}
              poster={Poster3}
            />
            {renderCloseButton()}
          </>
        );
      } else {
        return null;
      }
    }, [
      setPageToShow,
      setSilentScrollTo,
      learnMoreOn,
      pageYOffset,
      activeButton,
      phoneLayout,
      showLearnMore,
      height,
      learnMoreSectionBottom,
      learnMoreSectionTop,
      containerPosition,
    ]);

    const renderSection = useCallback(() => {
      const checkRenderInfo =
        pageIndex === "2" || (phoneLayout && sectionTop <= 550);

      /* Button logic */
      const learnMoreHandler = () => {
        if (!phoneLayout) {
          setPageToShow("perfomance");
        } else {
          setShowLearnMore(true);
          window.scrollTo({
            top: learnMoreSectionRef.current?.offsetTop,
            behavior: "smooth",
          });
        }
      };

      /* Render */
      return (
        <>
          <ContentElement
            customContentElementClassNames="perfomance__contentElement"
            horizontal={true}
          >
            <img
              className="perfomance__backgroundImage"
              src={width < 639 ? imagePhone : checkIpad ? ImageLand : Image}
              alt="modelS"
            />
            {renderTopContainer()}
          </ContentElement>
          <SideComponents
            title="Quickest Acceleration"
            subtitle="Performance"
            paragraph="Model S sets an industry standard for performance and safety.Tesla’s all-electric powertrain delivers unparalleledperformance in all weather conditions – with Dual MotorAll-Wheel Drive, adaptive air suspension and ludicrousacceleration."
            customInnerContainerClassNames="perfomance__sideInnerContainer"
            titleCustomClassNames="perfomance__title"
            horizontal={true}
            checkRenderInfo={checkRenderInfo}
            learnMoreOn={learnMoreOn}
            showLearnMore={showLearnMore}
            learnMoreHandle={learnMoreHandler}
            showSection={showSection}
          />
          <div
            ref={learnMoreSectionRef}
            className={checkLearnMore ? "perfomance__learnMoreContainer" : ""}
          >
            {renderLearnMoreSection()}
          </div>
        </>
      );
    }, [
      checkIpad,
      sectionTop,
      setPageToShow,
      showLearnMore,
      showSection,
      renderLearnMoreSection,
      renderTopContainer,
      width,
      learnMoreOn,
      pageIndex,
      phoneLayout,
      checkLearnMore,
    ]);

    /* Final Render */
    return (
      <section ref={sectionRef} className="section perfomance">
        <>{renderSection()}</>
      </section>
    );
  }
);
