import React, { useState, useEffect, useRef, useCallback } from "react";
import SideComponents from "./SideComponents";
import ContentElement from "./ContentElement";
import InfoElement from "./InfoElement";
import RangeMap from "./RangeMap";
import LearnMoreTitleContainer from "./LearnMoreTitleContainer";
import Slider from "./Slider";

import Video from "../../static/videos/ModelS/Range.mp4";
import VideoMobile from "../../static/videos/ModelS/RangeMobile.mp4";

import Image1 from "../../static/images/ModelS/Range/learnMoreImage1.jpg";
import Image1Mobile from "../../static/images/ModelS/Range/learnMoreImage1-mobile.jpg";
import Image2 from "../../static/images/ModelS/Range/learnMoreImage2.jpg";
import Image2Mobile from "../../static/images/ModelS/Range/learnMoreImage2-mobile.jpg";
import Image3 from "../../static/images/ModelS/Range/learnMoreImage3.png";
import Image3Mobile from "../../static/images/ModelS/Range/learnMoreImage3-mobile.png";

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
    const videoRef = useRef(null);
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

    /* Learn More Section Render */
    const renderLearnMoreSection = useCallback(() => {
      /* Render Parts */

      const renderCloseButton = () => {
        /* Buttons logic */
        const CloseHandler = () => {
          if (!phoneLayout) {
            setPageToShow(null);
            setSilentScrollTo("range");
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
          setSilentScrollTo("autopilot");
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

      const renderGoAnywhere = () => {
        /* Data for animation Buttons */
        const showRangeButtons = [
          {
            title: "San Jose to Los Angeles",
            subtitleMiles: "340",
            showBorder: true,
            smaller: true,
          },
          {
            title: "Barkley to Lake Tahoe",
            subtitleMiles: "178",
            showBorder: false,
            smaller: true,
          },
          {
            title: "Manhattan to Boston",
            subtitleMiles: "221",
            showBorder: false,
            smaller: true,
          },
          {
            title: "Fort Lauderdale to Orlando",
            subtitleMiles: "195",
            showBorder: false,
            smaller: true,
          },
          {
            title: "Austin to Dallas",
            subtitleMiles: "195",
            showBorder: false,
            smaller: true,
          },
        ];

        /* Render */
        return (
          <>
            <LearnMoreTitleContainer
              customParagraphClassNames="range__learnMoreParagraph--1"
              customClassNames="range__learnMoreTitleContainer--1"
              title="Go Anywhere"
              paragraph="Experience the freedom of long-distance travel with convenient access to the Tesla global charging network."
            />
            <Slider
              big
              numberOfSlides={5}
              bigButtonsData={showRangeButtons}
              slideContent="animationElement"
              page="Model S"
            />
          </>
        );
      };

      const renderChargeAnywhere = () => {
        /* Data for animation Buttons */
        const chargeButtons = [
          {
            title: "Home Charging",
            text: "Change Model S overnight for one week worth of driving",
            showBorder: true,
            longer: true,
            showTopBorder: true,
          },
          {
            title: "On the Road",
            text:
              "Stop and recharge half of the battery while you get a cup of coffee",
            showBorder: false,
            longer: true,
            showTopBorder: true,
          },
          {
            title: "Upon Arrival",
            text:
              "Park and recharge for your next destination while away from home",
            showBorder: false,
            longer: true,
            showTopBorder: true,
          },
        ];
        const slidesData = [
          {
            image: width <= 800 ? Image1Mobile : Image1,
            alt: "interior",
          },
          {
            image: width <= 800 ? Image2Mobile : Image2,
            alt: "interior",
          },
          {
            image: width <= 800 ? Image3Mobile : Image3,
            alt: "interior",
          },
        ];

        /* Slider */
        return (
          <>
            <LearnMoreTitleContainer
              customParagraphClassNames="range__learnMoreParagraph--2"
              customClassNames="range__learnMoreTitleContainer--2"
              title="Charge Anywhere"
              paragraph="Stay charged with convenient options anywhere you go — at home, on the road and upon arrival."
            />
            <Slider
              numberOfSlides={3}
              slidesData={slidesData}
              bigButtonsData={chargeButtons}
              slideContent="images"
              opacitySlider
              medium
            />
          </>
        );
      };

      const renderSupercharger = () => {
        /* Render */
        return (
          <>
            <LearnMoreTitleContainer
              customParagraphClassNames="range__learnMoreParagraph--3"
              customClassNames="range__learnMoreTitleContainer--3"
              title="Supercharge"
              paragraph="Charge for about 15 minutes while you grab a cup of coffee or a quick bite to eat. And with over 18,000 Superchargers placed along well-traveled routes around the world, Model S can get you anywhere you want to go."
            />
            <div className="range__learnMoreContentContainer range__learnMoreContentContainer--map">
              {learnMoreSectionTop < -300 && <RangeMap />}
            </div>
          </>
        );
      };
      /* Final Render */
      if (checkLearnMore) {
        return (
          <>
            <div className="range__learnMoreInnerContainer">
              {renderGoAnywhere()}
              {renderChargeAnywhere()}
              {renderSupercharger()}
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

    /* Section Render */
    const renderSection = useCallback(() => {
      /* Screen size check */
      const checkRenderInfo =
        pageIndex === "3" || (phoneLayout && sectionTop <= 600);

      const checkRenderSideElement =
        pageIndex === "3" || (phoneLayout && sectionTop <= 300);

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

      /* Info Elements */
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
          <div className="range__container">
            <ContentElement horizontal={width <= 1200}>
              <div className="range__infoElementsContainer">
                {checkRenderInfo && renderInfoElement()}
              </div>
              {phoneLayout
                ? videoElement()
                : pageIndex === "3" && videoElement()}
            </ContentElement>
            <SideComponents
              title="Go Anywhere"
              subtitle="Range"
              paragraph="Model S can get you anywhere you want to go—withindustry-leading range and convenient charging options, allover the world."
              customClassNames="range__sideComponent"
              customInnerContainerClassNames="range__sideInnerContainer"
              horizontal={width <= 1200}
              checkRenderInfo={checkRenderSideElement}
              learnMoreOn={learnMoreOn}
              showLearnMore={showLearnMore}
              learnMoreHandle={learnMoreHandler}
              showSection={showSection}
            />
          </div>
          <div
            className={checkLearnMore ? "range__learnMoreContainer" : ""}
            ref={learnMoreSectionRef}
          >
            {renderLearnMoreSection()}
          </div>
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
      checkLearnMore,
      renderLearnMoreSection,
    ]);

    return (
      <section ref={sectionRef} className="section range">
        {renderSection()}
      </section>
    );
  }
);
