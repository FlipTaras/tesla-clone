import React, { useState, useEffect, useRef, useCallback } from "react";
import classnames from "classnames";

/* Components */
import CloseNextButton from "../Buttons/CloseNextButton";
import SideComponents from "./SideComponents";
import ContentElement from "./ContentElement";
import LearnMoreTitleContainer from "./LearnMoreTitleContainer";
import LearnMoreVideoTextContainer from "./LearnMoreVideoTextContainer";
import Slider from "./Slider";

/* Images */
import Icon from "../../static/images/ModelS/Autopilot/12Icon.png";
import InfoElement from "./InfoElement";
import Video from "../../static/videos/ModelS/autopilot.mp4";
import VideoMobile from "../../static/videos/ModelS/autopilot mobile.mp4";
import LearMoreSlider1 from "../../static/videos/ModelS/Autopilot/LearnSlider1.mp4";
import LearMoreSlider2 from "../../static/videos/ModelS/Autopilot/LearnSlider2.mp4";
import LearMoreSlider3 from "../../static/videos/ModelS/Autopilot/LearnSlider3.mp4";
import LearMoreSlider4 from "../../static/videos/ModelS/Autopilot/LearnSlider4.mp4";
import DriverVideo from "../../static/videos/ModelS/Autopilot/DriverAsistance.mp4";
import VideoFuture from "../../static/videos/ModelS/Autopilot/Future.mp4";
import FullSelfDriveImage from "../../static/images/ModelS/Autopilot/Full-SelfdriveCarImage.jpg";
import FullSelfDriveBackground1 from "../../static/images/ModelS/Autopilot/Full-SelfDriveBackGround1.png";
import FullSelfDriveBackground2 from "../../static/images/ModelS/Autopilot/Full-SelfDriveBackGround2.png";

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
    const checkLearnMore = showLearnMore || learnMoreOn;
    const videoRef = useRef(null);
    const LearMoreSlider1Ref = useRef(null);
    const LearMoreSlider2Ref = useRef(null);
    const LearMoreSlider3Ref = useRef(null);
    const LearMoreSlider4Ref = useRef(null);
    const [paragraphActive, setParagraphActive] = useState(1);
    const [paragraph, setParagraph] = useState(
      "All new Tesla vehicles come standard with the most advanced driver assistance capabilities, designed to provide enhanced safety and convenience for a stress-free driving experience."
    );

    /* Choose paragraph for Driver Section */
    useEffect(() => {
      switch (paragraphActive) {
        case 1:
          setParagraph(
            "All new Tesla vehicles come standard with the most advanced driver assistance capabilities, designed to provide enhanced safety and convenience for a stress-free driving experience."
          );
          setTimeout(() => {
            setParagraphActive(2);
          }, 8000);
          break;
        case 2:
          setParagraph(
            "Eight cameras and 12 ultrasonic sensors detect lane lines and surrounding objects—providing 360 degrees of visibility, at all times."
          );
          setTimeout(() => {
            setParagraphActive(3);
          }, 8000);
          break;
        case 3:
          setParagraph(
            "Model S keeps you within a lane while matching speed to traffic conditions, without any driver input."
          );
          setTimeout(() => {
            setParagraphActive(1);
          }, 8000);
          break;
        default:
          setParagraphActive(1);
          setParagraph(
            "All new Tesla vehicles come standard with the most advanced driver assistance capabilities, designed to provide enhanced safety and convenience for a stress-free driving experience."
          );
          break;
      }
    }, [paragraphActive]);

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
            setSilentScrollTo("autopilot");
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
          setSilentScrollTo("interior");
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

      const renderFeatures = () => {
        /* Video Buttons */
        const videoButtons = [
          {
            title: "Navigate on Autopilot",
            text: "Active Guidance from hightway on-ramp to off-ramp",
            showBorder: true,
            smaller: true,
            white: false,
          },
          {
            title: "Summon",
            text: "Automatically retrieve your car",
            smaller: true,
            showBorder: false,
            white: false,
          },
          {
            title: "Autopark",
            text: "Parallel and perpendicular parking, with a single touch",
            smaller: true,
            showBorder: false,
            white: false,
          },
          {
            title: "Auto Lane Change",
            text: "Automatically change lanes while driving on the hightway",
            smaller: true,
            showBorder: false,
            white: false,
          },
        ];

        const videos = [
          {
            link: LearMoreSlider1,
            ref: LearMoreSlider1Ref,
            autoPlay: true,
            duration: 14000,
          },
          {
            link: LearMoreSlider2,
            ref: LearMoreSlider2Ref,
            duration: 4000,
          },
          {
            link: LearMoreSlider3,
            ref: LearMoreSlider3Ref,
            duration: 10000,
          },
          {
            link: LearMoreSlider4,
            ref: LearMoreSlider4Ref,
            duration: 9000,
          },
        ];
        return (
          <>
            <LearnMoreTitleContainer
              title="Features"
              customClassNames="autopilot__learnMoreTitleContainer--1"
              customParagraphClassNames="autopilot__learnMoreParagraph--1"
              paragraph="Autopilot enables your car to steer, accelerate and brake automatically within its lane. Full Self-Driving Capability introduces additional features and improves existing functionality to make your car more capable over time including:"
            />
            <Slider
              sliderCustomClassNames="autopilot__slider"
              sliderButtonsCustomClassNames="autopilot__sliderButtons"
              numberOfSlides={4}
              slidesData={videos}
              bigButtonsData={videoButtons}
              swipeSlider
              slideContent="videos"
            />
          </>
        );
      };

      const renderDriverAsistance = () => {
        /* Animation Apper Settings */
        const check = phoneLayout || (!phoneLayout && pageYOffset > 950);

        const driverInnerClassNames = classnames(
          "autopilot__driverInner",
          check && "autopilot__driverInner--active"
        );
        return (
          <div className={driverInnerClassNames}>
            <LearnMoreVideoTextContainer
              customVideoInnerClassNames="autopilot__learnMoreVideotextVideoInner"
              customInfoContainerClassNames="autopilot__learnMoreVideotextInfoContainer"
              title="Driver Assistance Capabilities"
              paragraph={paragraph}
              video={DriverVideo}
              active={paragraphActive}
            />
          </div>
        );
      };

      const renderFullSelfDriving = () => {
        const check = phoneLayout || (!phoneLayout && pageYOffset > 1200);
        const checkImage = phoneLayout || (!phoneLayout && pageYOffset > 1600);

        /* Render */
        return (
          <>
            {check && (
              <LearnMoreTitleContainer
                customClassNames="autopilot__learnMoreTitleContainer--fullSelfDrive"
                title="Full Self-Driving Hardware"
                paragraph="Every new Model S comes standard with advanced hardware capable of providing Autopilot features today, and full self-driving capabilities in the future—through software updates designed to improve functionality over time."
              />
            )}
            {checkImage && (
              <div className="autopilot__learnMoreContentContainer autopilot__learnMoreContentContainer--fullSelfDrive">
                <div className="autopilot__learnMoreContentContainerInner--fullSelfDrive">
                  <img
                    className="autopilot__carImage"
                    src={FullSelfDriveImage}
                    alt="Model S"
                  />
                  <img
                    className="autopilot__greenBackground"
                    src={FullSelfDriveBackground1}
                    alt="background"
                  />
                  <img
                    className="autopilot__orangeBackground"
                    src={FullSelfDriveBackground2}
                    alt="background"
                  />
                </div>
              </div>
            )}
          </>
        );
      };

      const renderFuture = () => {
        if (phoneLayout || (!phoneLayout && pageYOffset > 2400)) {
          return (
            <LearnMoreVideoTextContainer
              title="The Future of Autopilot"
              paragraph="All Tesla vehicles have the hardware needed in the future for full self-driving in almost all circumstances, at a safety level we believe will be at least twice as good as the average human driver. "
              video={VideoFuture}
            />
          );
        }
      };

      /* Render */
      if (checkLearnMore) {
        return (
          <>
            <div className="autopilot__learnMoreInnerContainer">
              {renderFeatures()}
              {renderDriverAsistance()}
              {renderFullSelfDriving()}
              {renderFuture()}
            </div>

            {renderCloseButton()}
          </>
        );
      }
    }, [
      checkLearnMore,
      height,
      learnMoreSectionBottom,
      learnMoreSectionTop,
      phoneLayout,
      setPageToShow,
      setSilentScrollTo,
      paragraph,
      paragraphActive,
      pageYOffset,
    ]);

    const renderSection = useCallback(() => {
      /* Check when section to show up */
      const checkRenderInfo =
        pageIndex === "4" || (phoneLayout && sectionTop <= 500);
      const sideElementRender =
        pageIndex === "4" || (phoneLayout && sectionTop <= 350);

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
            checkRenderInfo={sideElementRender}
            learnMoreOn={learnMoreOn}
            showLearnMore={showLearnMore}
            learnMoreHandle={learnMoreHandler}
            showSection={showSection}
          />
          <div
            ref={learnMoreSectionRef}
            className={learnMoreOn ? "autopilot__learnMoreContainer" : ""}
          >
            {renderLearnMoreSection()}
          </div>
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
      renderLearnMoreSection,
    ]);

    /* Final Render */
    return (
      <section ref={sectionRef} className="section autopilot">
        <div className="autopilot__container">{renderSection()}</div>
      </section>
    );
  }
);
