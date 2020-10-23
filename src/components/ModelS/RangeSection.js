import React, { useState, useEffect, useRef, useCallback } from "react";
import SideComponents from "./SideComponents";
import ContentElement from "./ContentElement";
import InfoElement from "./InfoElement";
import RangeMap from "./RangeMap";
import LearnMoreTitleContainer from "./LearnMoreTitleContainer";
import RangeAnimationEement from "./RangeAnimationElement";
import VideoButton from "./VideoButton";

import Video from "../../static/videos/ModelS/Range.mp4";
import VideoMobile from "../../static/videos/ModelS/RangeMobile.mp4";

import Image1 from "../../static/images/ModelS/Range/learnMoreImage1.jpg";
import Image1Mobile from "../../static/images/ModelS/Range/learnMoreImage1-mobile.jpg";
import Image2 from "../../static/images/ModelS/Range/learnMoreImage2.jpg";
import Image2Mobile from "../../static/images/ModelS/Range/learnMoreImage2-mobile.jpg";
import Image3 from "../../static/images/ModelS/Range/learnMoreImage3.png";
import Image3Mobile from "../../static/images/ModelS/Range/learnMoreImage3-mobile.png";
import ImageFix from "../../static/images/ModelS/Range/learnMoreSlider1.jpg";

/* Redux */
import { connect } from "react-redux";
import {
  setPageToShow,
  setSilentScrollTo,
  setRangeActiveButton,
} from "../../static/store/actions";
import CloseNextButton from "../Buttons/CloseNextButton";

const mapStateToProps = (state) => ({
  pageIndex: state.models.pageIndex,
  pageYOffset: state.page.pageYOffset,
  width: state.page.width,
  height: state.page.height,
  rangeButtonActive: state.models.rangeButtonActive,
});

const mapActionToProps = {
  setPageToShow,
  setSilentScrollTo,
  setRangeActiveButton,
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
    setRangeActiveButton,
    rangeButtonActive,
  }) => {
    const videoRef = useRef(null);
    const [showLearnMore, setShowLearnMore] = useState(false);
    const checkLearnMore = showLearnMore || learnMoreOn;
    const [chargeActiveButton, setChargeActiveButton] = useState(1);

    /* Container animation Logic */
    const [
      showRangeButtonsContainerPositon,
      setShowRangeButtonsContainerPositon,
    ] = useState("0");

    useEffect(() => {
      switch (rangeButtonActive) {
        case 1:
          setShowRangeButtonsContainerPositon("0");
          break;
        case 2:
          if (width <= 400) {
            setShowRangeButtonsContainerPositon("-10rem");
          } else if (width <= 500) {
            setShowRangeButtonsContainerPositon("-5rem");
          } else {
            setShowRangeButtonsContainerPositon("0");
          }
          break;
        case 3:
          if (width <= 400) {
            setShowRangeButtonsContainerPositon("-25rem");
          } else if (width <= 800) {
            setShowRangeButtonsContainerPositon("-20rem");
          } else {
            setShowRangeButtonsContainerPositon("0");
          }
          break;
        case 4:
          if (width <= 800) {
            setShowRangeButtonsContainerPositon("-40rem");
          } else {
            setShowRangeButtonsContainerPositon("-20rem");
          }
          break;
        case 5:
          if (width <= 600) {
            setShowRangeButtonsContainerPositon("-45rem");
          } else if (width <= 800) {
            setShowRangeButtonsContainerPositon("-40rem");
          } else {
            setShowRangeButtonsContainerPositon("-40rem");
          }
          break;
        default:
          setShowRangeButtonsContainerPositon("0");
          break;
      }
    }, [rangeButtonActive, width]);

    /* Charger container animation logic */
    const [
      chargerButtonsContainerPosition,
      setChargerButtonsContainerPosition,
    ] = useState("0");

    useEffect(() => {
      if (width <= 800) {
        switch (chargeActiveButton) {
          case 1:
            if (width <= 400) {
              setChargerButtonsContainerPosition("5rem");
            } else if (width <= 600) {
              setChargerButtonsContainerPosition("10rem");
            } else {
              setChargerButtonsContainerPosition("0");
            }
            break;
          case 2:
            if (width <= 400) {
              setChargerButtonsContainerPosition("-5rem");
            } else {
              setChargerButtonsContainerPosition("0");
            }
            break;
          case 3:
            if (width <= 600) {
              setChargerButtonsContainerPosition("-20rem");
            } else {
              setChargerButtonsContainerPosition("-2rem");
            }
            break;
          default:
            setChargerButtonsContainerPosition("0");
            break;
        }
      }
    }, [chargeActiveButton, width]);

    /* rangeAnimationElement Logic */
    const [animation, setAnimation] = useState(null);
    const [chargeAnimation, setChargerAnimation] = useState(null);

    const buttonClickedAnimation = useCallback(
      (value) => {
        clearTimeout(animation);
        setRangeActiveButton(value);
      },
      [animation, setRangeActiveButton]
    );
    const chargerAnimationReset = useCallback(
      (value) => {
        clearTimeout(chargeAnimation);
        setChargeActiveButton(value);
      },
      [chargeAnimation, setChargeActiveButton]
    );

    useEffect(() => {
      if (learnMoreOn || phoneLayout) {
        setAnimation(
          setTimeout(() => {
            if (rangeButtonActive === 5) {
              setRangeActiveButton(1);
            } else {
              setRangeActiveButton(rangeButtonActive + 1);
            }
          }, 6000)
        );
      }
    }, [learnMoreOn, rangeButtonActive, setRangeActiveButton, phoneLayout]);

    useEffect(() => {
      if (learnMoreOn || phoneLayout) {
        setChargerAnimation(
          setTimeout(() => {
            if (chargeActiveButton === 3) {
              setChargeActiveButton(1);
            } else {
              setChargeActiveButton(chargeActiveButton + 1);
            }
          }, 4000)
        );
      }
    }, [learnMoreOn, phoneLayout, chargeActiveButton, setRangeActiveButton]);

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

      /* Data for animation Buttons */
      const numberOfAnimationElements = 5;
      const pageAnimationElements = Array.from(
        Array(numberOfAnimationElements).keys()
      );

      const showRangeButtons = [
        {
          title: "San Jose to Los Angeles",
          subtitleMiles: "340",
          showBorder: true,
        },
        {
          title: "Barkley to Lake Tahoe",
          subtitleMiles: "178",
          showBorder: false,
        },
        {
          title: "Manhattan to Boston",
          subtitleMiles: "221",
          showBorder: false,
        },
        {
          title: "Fort Lauderdale to Orlando",
          subtitleMiles: "195",
          showBorder: false,
        },
        {
          title: "Austin to Dallas",
          subtitleMiles: "195",
          showBorder: false,
        },
      ];

      const chargeButtons = [
        {
          title: "Home Charging",
          text: "Change Model S overnight for one week worth of driving",
          showBorder: true,
        },
        {
          title: "On the Road",
          text:
            "Stop and recharge half of the battery while you get a cup of coffee",
          showBorder: false,
        },
        {
          title: "Upon Arrival",
          text:
            "Park and recharge for your next destination while away from home",
          showBorder: false,
        },
      ];

      /* Render Parts */
      const renderGoAnywhere = () => {
        return (
          <>
            <LearnMoreTitleContainer
              customParagraphClassNames="range__learnMoreParagraph--1"
              customClassNames="range__learnMoreTitleContainer--1"
              title="Go Anywhere"
              paragraph="Experience the freedom of long-distance travel with convenient access to the Tesla global charging network."
            />
            <div className="range__learnMoreContentContainer range__learnMoreContentContainer--showRange">
              <img
                src={ImageFix}
                alt="height fix"
                style={{ opacity: "0", width: "100%", height: "100%" }}
              />
              {pageAnimationElements.map((el, i) => (
                <RangeAnimationEement
                  page="Range"
                  phoneLayout={phoneLayout}
                  learnMoreOn={learnMoreOn}
                  show={rangeButtonActive === i + 1}
                  number={i + 1}
                  key={i}
                />
              ))}
            </div>
            <div className="range__learnMoreButtonsContainer range__learnMoreButtonsContainer--showRange">
              <div
                style={{
                  left: showRangeButtonsContainerPositon,
                }}
                className="range__showRangeButtonsContainerInner"
              >
                {showRangeButtons.map((el, i) => (
                  <VideoButton
                    key={i}
                    title={el.title}
                    subtitleMiles={el.subtitleMiles}
                    smaller
                    showBorder={el.showBorder}
                    click={() => buttonClickedAnimation(i + 1)}
                    active={rangeButtonActive === i + 1}
                    activeButton={rangeButtonActive}
                  />
                ))}
              </div>
            </div>
          </>
        );
      };

      const renderChargeAnywhere = () => {
        /* Choose what image to redner for Charger Element */
        const renderImage = () => {
          switch (chargeActiveButton) {
            case 1:
              if (width <= 800) {
                return Image1;
              } else {
                return Image1Mobile;
              }
            case 2:
              if (width <= 800) {
                return Image2;
              } else {
                return Image2Mobile;
              }
            case 3:
              if (width <= 800) {
                return Image3;
              } else {
                return Image3Mobile;
              }

            default:
              return null;
          }
        };
        /* Render Section */
        if (
          (phoneLayout && pageYOffset > 2800) ||
          (!phoneLayout && pageYOffset > 1100)
        ) {
          return (
            <>
              <LearnMoreTitleContainer
                customParagraphClassNames="range__learnMoreParagraph--2"
                customClassNames="range__learnMoreTitleContainer--2"
                title="Charge Anywhere"
                paragraph="Stay charged with convenient options anywhere you go — at home, on the road and upon arrival."
              />
              <div className="range__learnMoreContentContainer range__learnMoreContentContainer--charger">
                <img
                  className="range__image"
                  src={renderImage()}
                  alt="Model S"
                />
              </div>
              <div
                style={{
                  transform: `translateX(${chargerButtonsContainerPosition})`,
                }}
                className="range__learnMoreButtonsContainer range__learnMoreButtonsContainer--charger"
              >
                {chargeButtons.map((el, i) => (
                  <VideoButton
                    customVideoContentContainer="range__chargerVideoContentContainer"
                    customTextClassNames="range__chargerVideoButtonText"
                    customTitleClassNames="range__chargerVideoButtonTitle"
                    customClassNames="range__chargerVideoButton"
                    title={el.title}
                    text={el.text}
                    click={() => chargerAnimationReset(i + 1)}
                    active={chargeActiveButton === i + 1}
                    activeButton={chargeActiveButton}
                    showTopBorder
                    noBorder
                    showBorder={el.showBorder}
                  />
                ))}
              </div>
            </>
          );
        }
        return null;
      };

      const renderSupercharger = () => {
        if (
          (phoneLayout && pageYOffset > 3300) ||
          (!phoneLayout && pageYOffset > 1900)
        ) {
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
        }
        return null;
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
      learnMoreOn,
      buttonClickedAnimation,
      chargeActiveButton,
      chargerAnimationReset,
      checkLearnMore,
      showRangeButtonsContainerPositon,
      rangeButtonActive,
      chargerButtonsContainerPosition,
      pageYOffset,
      width,
    ]);

    /* Section Render */
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
              checkRenderInfo={checkRenderInfo}
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
