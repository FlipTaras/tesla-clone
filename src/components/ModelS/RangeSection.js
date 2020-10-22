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

/* Redux */
import { connect } from "react-redux";
import {
  setPageToShow,
  setSilentScrollTo,
  setRangeActiveButton,
} from "../../static/store/actions";

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

    /* Choose what image to redner for Charger Elment */
    const renderImage = useCallback(() => {
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
    }, [width, chargeActiveButton]);

    /* Container animation Logic */
    const [containerPosition, setContainerPosition] = useState("0");
    useEffect(() => {
      switch (rangeButtonActive) {
        case 1:
          setContainerPosition("0");
          break;
        case 2:
          setContainerPosition("0");
          break;
        case 3:
          setContainerPosition("0");
          break;
        case 4:
          setContainerPosition("-20rem");
          break;
        case 5:
          setContainerPosition("-40rem");
          break;
        default:
          setContainerPosition("0");
          break;
      }
    }, [rangeButtonActive]);

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
    // const [learnMoreSectionBottom, setLearnMoreSectionBottom] = useState(null);

    useEffect(() => {
      const getAndShowTop = () => {
        const rectSection = sectionRef.current.getBoundingClientRect();
        const rectLearnMoreSection = learnMoreSectionRef.current?.getBoundingClientRect();
        setSectionTop(rectSection.top);
        setLearnMoreSectionTop(rectLearnMoreSection.top);
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
          <ContentElement horizontal={width <= 1200}>
            <div className="range__infoElementsContainer">
              {checkRenderInfo && renderInfoElement()}
            </div>
            {phoneLayout ? videoElement() : pageIndex === "3" && videoElement()}
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
    ]);

    return (
      <section ref={sectionRef} className="section range">
        <div className="range__container">{renderSection()}</div>
        <div
          className={checkLearnMore ? "range__learnMoreContainer" : ""}
          ref={learnMoreSectionRef}
        >
          {checkLearnMore && (
            <div className="range__learnMoreInnerContainer">
              <LearnMoreTitleContainer
                customParagraphClassNames="range__learnMoreParagraph--1"
                customClassNames="range__learnMoreTitleContainer--1"
                title="Go Anywhere"
                paragraph="Experience the freedom of long-distance travel with convenient access to the Tesla global charging network."
              />
              <div className="range__learnMoreAnimationElementsContainer">
                <RangeAnimationEement
                  number={1}
                  show={rangeButtonActive === 1}
                  learnMoreOn={learnMoreOn}
                  phoneLayout={phoneLayout}
                  page="Range"
                />
                <RangeAnimationEement
                  number={2}
                  show={rangeButtonActive === 2}
                  phoneLayout={phoneLayout}
                  learnMoreOn={learnMoreOn}
                  page="Range"
                />
                <RangeAnimationEement
                  number={3}
                  show={rangeButtonActive === 3}
                  phoneLayout={phoneLayout}
                  learnMoreOn={learnMoreOn}
                  page="Range"
                />
                <RangeAnimationEement
                  number={4}
                  show={rangeButtonActive === 4}
                  phoneLayout={phoneLayout}
                  learnMoreOn={learnMoreOn}
                  page="Range"
                />
                <RangeAnimationEement
                  number={5}
                  show={rangeButtonActive === 5}
                  phoneLayout={phoneLayout}
                  learnMoreOn={learnMoreOn}
                  page="Range"
                />
              </div>
              <div className="range__videoButtonsContainer">
                <div
                  style={{
                    left: containerPosition,
                  }}
                  className="range__videoButtonsInner"
                >
                  <VideoButton
                    title="San Jose to Los Angeles"
                    subtitleMiles="340"
                    smaller
                    showBorder={true}
                    click={() => buttonClickedAnimation(1)}
                    active={rangeButtonActive === 1}
                    activeButton={rangeButtonActive}
                  />
                  <VideoButton
                    title="Barkley to Lake Tahoe"
                    subtitleMiles="178"
                    smaller
                    showBorder={false}
                    click={() => buttonClickedAnimation(2)}
                    active={rangeButtonActive === 2}
                    activeButton={rangeButtonActive}
                  />
                  <VideoButton
                    title="Manhattan to Boston"
                    subtitleMiles="211"
                    smaller
                    showBorder={false}
                    click={() => buttonClickedAnimation(3)}
                    active={rangeButtonActive === 3}
                    activeButton={rangeButtonActive}
                  />
                  <VideoButton
                    title="Fort Lauderdale to Orlando"
                    subtitleMiles="195"
                    smaller
                    showBorder={false}
                    click={() => buttonClickedAnimation(4)}
                    active={rangeButtonActive === 4}
                    activeButton={rangeButtonActive}
                  />
                  <VideoButton
                    title="Austin to Dallas"
                    subtitleMiles="195"
                    smaller
                    showBorder={false}
                    click={() => buttonClickedAnimation(5)}
                    active={rangeButtonActive === 5}
                    activeButton={rangeButtonActive}
                  />
                </div>
              </div>
              <LearnMoreTitleContainer
                customParagraphClassNames="range__learnMoreParagraph--2"
                customClassNames="range__learnMoreTitleContainer--2"
                title="Charge Anywhere"
                paragraph="Stay charged with convenient options anywhere you go — at home, on the road and upon arrival."
              />
              <div className="range__learnMoreAnimationElementsContainer">
                <img
                  className="range__image"
                  src={renderImage()}
                  alt="Model S"
                />
              </div>
              <div className="range__learnMoreChargingButtons">
                <VideoButton
                  title="Home Charging"
                  text="Change Model S overnight for one week worth of driving"
                  click={() => chargerAnimationReset(1)}
                  active={chargeActiveButton === 1}
                  activeButton={chargeActiveButton}
                  showTopBorder
                  noBorder
                  showBorder={true}
                />
                <VideoButton
                  title="On the Road"
                  text="Stop and recharge half of the battery while you get a cup of coffee"
                  click={() => chargerAnimationReset(2)}
                  active={chargeActiveButton === 2}
                  activeButton={chargeActiveButton}
                  showTopBorder={false}
                  noBorder
                />
                <VideoButton
                  title="Upon Arrival"
                  text="Park and recharge for your next destination while away from home"
                  click={() => chargerAnimationReset(3)}
                  active={chargeActiveButton === 3}
                  activeButton={chargeActiveButton}
                  showTopBorder={false}
                  noBorder
                />
              </div>
              <LearnMoreTitleContainer
                customParagraphClassNames="range__learnMoreParagraph--3"
                customClassNames="range__learnMoreTitleContainer--3"
                title="
                Supercharge"
                paragraph="Charge for about 15 minutes while you grab a cup of coffee or a quick bite to eat. And with over 18,000 Superchargers placed along well-traveled routes around the world, Model S can get you anywhere you want to go."
              />
              <div className="range__learnMoreMapContainer">
                {learnMoreSectionTop < -300 && <RangeMap />}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
);
