import React, { useEffect, useCallback, useRef, useState } from "react";
import { connect } from "react-redux";
import { setPageToShow, setSilentScrollTo } from "../../static/store/actions";
import SafetyAnimatedElement from "./SafetyAnimatedElement";
import CloseNextButton from "../Buttons/CloseNextButton";

/* Images */
import ModelsStructureInitial from "../../static/images/ModelS/Safety/Safety.png";
import ModelsStructureLeanMore from "../../static/images/ModelS/Safety/model-s-supportive-structure.jpg";
import ModelsImageMobile from "../../static/images/ModelS/Safety/Safety-mobile.jpg";
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
    showSection,
    width,
    height,
    phoneLayout,
  }) => {
    const checkIpadAndWidthSmaller1024 =
      (width === 1024 && height === 1366) || width < 1024;
    const checkIpad = width === 1024 && height === 1366;
    const [showLearnMore, setShowLearnMore] = useState(false);

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
    const renderSaferyRight = useCallback(() => {
      if (pageIndex === "1" || (phoneLayout && sectionTop <= 700)) {
        return (
          <>
            <div className="safety__animatedElements">
              <SafetyAnimatedElement
                show={learnMoreOn}
                title="Front-Impact Protection"
                customTitleClassNames="safety__safetyanimatedElements__title--1"
                elementClassNames="safety__safetyanimatedElements__element--1"
                customLineClassNames="safety__safetyanimatedElements__line--1"
                customDotClassNames="safety__safetyanimatedElements__dot--1"
              />
              <SafetyAnimatedElement
                show={learnMoreOn}
                title="Side-Impact Protection"
                customTitleClassNames="safety__safetyanimatedElements__title--2"
                elementClassNames="safety__safetyanimatedElements__element--2"
                customLineClassNames="safety__safetyanimatedElements__line--2"
                customDotClassNames="safety__safetyanimatedElements__dot--2"
              />
              <SafetyAnimatedElement
                show={learnMoreOn}
                title="Very Low Rollover Risk"
                customTitleClassNames="safety__safetyanimatedElements__title--3"
                elementClassNames="safety__safetyanimatedElements__element--3"
                customLineClassNames="safety__safetyanimatedElements__line--3"
                customDotClassNames="safety__safetyanimatedElements__dot--3"
              />
            </div>
          </>
        );
      } else {
        return null;
      }
    }, [learnMoreOn, pageIndex, phoneLayout, sectionTop]);

    const renderLearnMoreSection = useCallback(() => {
      const CloseHandler = () => {
        if (!phoneLayout) {
          setPageToShow(null);
          setSilentScrollTo("safety");
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
        setSilentScrollTo("perfomance");
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

      if (learnMoreOn || showLearnMore) {
        return (
          <>
            <div className="safety__learnMoreInnerContainer">
              <div className="safety__learnMoreTopContainer">
                <h1 className="safety__learnMoreTitle title title--animated">
                  Built for Safety
                </h1>
                <p className="safety__learnMoreParagraph paragraph paragraph--animated">
                  Model S is built for safety, with all-electric architecture
                  designed to provide protection from every side—and one of the
                  lowest rollover risks of any car on the road.
                </p>
              </div>
              <img
                className="safety__learnMoreImage"
                src={ModelsStructureLeanMore}
                alt="Models-structure"
              />
              {checkIpadAndWidthSmaller1024 ? (
                <>
                  <ul className="safety__numbersContainer">
                    <li className="safety__numberDescriptionNumber safety__numberDescriptionNumber--1">
                      1
                    </li>
                    <li className="safety__numberDescriptionNumber safety__numberDescriptionNumber--2">
                      2
                    </li>
                    <li className="safety__numberDescriptionNumber safety__numberDescriptionNumber--3">
                      3
                    </li>
                  </ul>
                  <div className="safety__numberDescriptionContainer">
                    <span className="safety__numberDescriptionNumber">1</span>
                    <h2 className="safety__numberDescriptionTitle">
                      Front-Impact Protection
                    </h2>
                    <p className="safety__numberDescriptionText">
                      There is no internal combustion engine in Model S, so the
                      crumple zone has greater opportunity to minimize occupant
                      deceleration in the event of frontal impact.
                    </p>
                  </div>
                  <div className="safety__numberDescriptionContainer">
                    <span className="safety__numberDescriptionNumber">2</span>
                    <h2 className="safety__numberDescriptionTitle">
                      Side-Impact Protection
                    </h2>
                    <p className="safety__numberDescriptionText">
                      The combination of a high-strength central pillar and an
                      energy-absorbing sill structure provides exceptional
                      protection to both the occupant and the under-floor
                      mounted battery pack.
                    </p>
                  </div>
                  <div className="safety__numberDescriptionContainer">
                    <span className="safety__numberDescriptionNumber">3</span>
                    <h2 className="safety__numberDescriptionTitle">
                      Very Low Rollover Risk
                    </h2>
                    <p className="safety__numberDescriptionText">
                      The position and weight of the floor-mounted battery pack
                      provides a very low center of gravity—allowing for a very
                      low rollover risk.
                    </p>
                  </div>
                </>
              ) : (
                <div className="safety__learnMoreAnimatedElements">
                  <SafetyAnimatedElement
                    show={phoneLayout ? false : !learnMoreOn}
                    title="Front-Impact Protection"
                    titleFont="Gotham Bold"
                    titleAnimation="translateYOpacityShowFromTop .8s .8s forwards ease"
                    text="There is no internal combustion engine in Model S, so the crumple zone has greater opportunity to minimize occupant deceleration in the event of frontal impact."
                    textAnimation="translateYOpacityShowFromTop .8s .6s forwards ease"
                    elementClassNames="safety__learnMoreAnimatedElements__element--1"
                    customLineClassNames="safety__learnMoreAnimatedElements__line--1"
                    customDotClassNames="safety__learnMoreAnimatedElements__dot--1"
                  />
                  <SafetyAnimatedElement
                    show={phoneLayout ? false : !learnMoreOn}
                    title="Side-Impact Protection"
                    titleFont="Gotham Bold"
                    titleAnimation="translateYOpacityShowFromTop .8s 1s forwards ease"
                    text="The combination of a high-strength central pillar and an energy-absorbing sill structure provides exceptional protection to both the occupant and the under-floor mounted battery pack."
                    textAnimation="translateYOpacityShowFromTop .8s .8s forwards ease"
                    elementClassNames="safety__learnMoreAnimatedElements__element--2"
                    customLineClassNames="safety__learnMoreAnimatedElements__line--2"
                    customDotClassNames="safety__learnMoreAnimatedElements__dot--2"
                  />
                  <SafetyAnimatedElement
                    show={phoneLayout ? false : !learnMoreOn}
                    title="Very Low Rollover Risk"
                    titleFont="Gotham Bold"
                    titleAnimation="translateYOpacityShowFromTop .8s 1.2s forwards ease"
                    text="The position and weight of the floor-mounted battery pack provides a very low center of gravity—allowing for a very low rollover risk."
                    textAnimation="translateYOpacityShowFromTop .8s 1s forwards ease"
                    elementClassNames="safety__learnMoreAnimatedElements__element--3"
                    customLineClassNames="safety__learnMoreAnimatedElements__line--3"
                    customDotClassNames="safety__learnMoreAnimatedElements__dot--3"
                  />
                </div>
              )}
            </div>
            {renderCloseButton()}
          </>
        );
      } else {
        return null;
      }
    }, [
      learnMoreOn,
      setPageToShow,
      setSilentScrollTo,
      checkIpadAndWidthSmaller1024,
      showLearnMore,
      phoneLayout,
      height,
      learnMoreSectionBottom,
      learnMoreSectionTop,
    ]);

    const renderSafetySection = useCallback(() => {
      const checkRenderInfo =
        pageIndex === "1" || (phoneLayout && sectionTop <= 500);

      const LearnMoreHandler = () => {
        if (!phoneLayout) {
          setPageToShow("safety");
        } else {
          setShowLearnMore(true);
          window.scrollTo({
            top: learnMoreSectionRef.current?.offsetTop,
            behavior: "smooth",
          });
        }
      };
      return (
        <>
          <div className="safety__container">
            <SideComponents
              title="High Impact Protection"
              subtitle="Safety"
              paragraph="Model S is built from the ground up as an electric vehicle,with high-strength architecture and a floor-mounted batterypack allowing for incredible impact protection."
              customClassNames="safety__sideComponent"
              customParagraphClassNames="safety__paragraph"
              horizontal={width <= 1024}
              checkRenderInfo={checkRenderInfo}
              learnMoreOn={learnMoreOn}
              showLearnMore={showLearnMore}
              learnMoreHandle={LearnMoreHandler}
              showSection={showSection}
            />
            <ContentElement
              horizontal={width <= 1024}
              customContentElementClassNames="safety__contentElement"
            >
              <img
                src={
                  checkIpad
                    ? ModelsStructureInitial
                    : width <= 600
                    ? ModelsImageMobile
                    : ModelsStructureInitial
                }
                alt="Model S Structure"
                className="safety__image"
              />
              {renderSaferyRight()}
            </ContentElement>
          </div>
          <div
            ref={learnMoreSectionRef}
            className={
              learnMoreOn || showLearnMore ? "safety__learnMoreContainer" : ""
            }
          >
            {renderLearnMoreSection()}
          </div>
        </>
      );
    }, [
      checkIpad,
      renderLearnMoreSection,
      renderSaferyRight,
      pageIndex,
      phoneLayout,
      sectionTop,
      width,
      showSection,
      learnMoreOn,
      setPageToShow,
      showLearnMore,
    ]);
    return (
      <section ref={sectionRef} className="safety section">
        {phoneLayout ? (
          <div className="fp-tableCell">{renderSafetySection()}</div>
        ) : (
          <>{renderSafetySection()}</>
        )}
      </section>
    );
  }
);
