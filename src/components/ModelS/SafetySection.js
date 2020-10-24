import React, { useEffect, useCallback, useRef, useState } from "react";
import { connect } from "react-redux";
import { setPageToShow, setSilentScrollTo } from "../../static/store/actions";
import SafetyAnimatedElement from "./SafetyAnimatedElement";
import CloseNextButton from "../Buttons/CloseNextButton";
import LearnMoreTitleContainer from "../ModelS/LearnMoreTitleContainer";

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
    const [showLearnMore, setShowLearnMore] = useState(false);

    /* Content used in Animated Elements */
    const safetyInfoContent = [
      {
        title: "Front-Impact Protection",
        paragraph:
          "There is no internal combustion engine in Model S, so thecrumple zone has greater opportunity to minimize occupantdeceleration in the event of frontal impact.",
      },
      {
        title: "Side-Impact Protection",
        paragraph:
          "The combination of a high-strength central pillar and anenergy-absorbing sill structure provides exceptionalprotection to both the occupant and the under-floormounted battery pack.",
      },
      {
        title: "Very Low Rollover Risk",
        paragraph:
          "The position and weight of the floor-mounted battery packprovides a very low center of gravity—allowing for a verylow rollover risk.",
      },
    ];

    /* Different width and height checks */
    const checkIpadAndWidthSmaller1024 =
      (width >= 1024 && height >= 1366) || width < 1024;
    const checkIpad = width >= 1024 && height >= 1366;

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
      if (pageIndex === "1" || (phoneLayout && sectionTop <= 400)) {
        return (
          <>
            <div className="safety__animatedElements">
              {safetyInfoContent.map((el, i) => (
                <SafetyAnimatedElement
                  key={i}
                  show={learnMoreOn}
                  title="Front-Impact Protection"
                  customTitleClassNames={`safety__safetyanimatedElements__title--${
                    i + 1
                  }`}
                  elementClassNames={`safety__safetyanimatedElements__element--${
                    i + 1
                  }`}
                  customLineClassNames={`safety__safetyanimatedElements__line--${
                    i + 1
                  }`}
                  customDotClassNames={`safety__safetyanimatedElements__dot--${
                    i + 1
                  }`}
                />
              ))}
            </div>
          </>
        );
      } else {
        return null;
      }
    }, [learnMoreOn, pageIndex, phoneLayout, sectionTop, safetyInfoContent]);

    const renderLearnMoreSection = useCallback(() => {
      const renderCloseButton = () => {
        /* Buttons logic */

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
        if (
          learnMoreSectionTop < height - 20 &&
          learnMoreSectionBottom >= height
        ) {
          return closeButtonElement;
        } else {
          return null;
        }
      };

      /* Render */
      if (learnMoreOn || showLearnMore) {
        return (
          <>
            <div className="safety__learnMoreInnerContainer">
              <LearnMoreTitleContainer
                title="Built for Safety"
                paragraph="Model S is built for safety, with all-electric architecture designed toprovide protection from every side—and one of the lowest rollover risksof any car on the road."
              />
              <img
                className="safety__learnMoreImage"
                src={ModelsStructureLeanMore}
                alt="Models-structure"
              />
              {checkIpadAndWidthSmaller1024 ? (
                <>
                  <ul className="safety__numbersContainer">
                    {safetyInfoContent.map((el, i) => (
                      <li
                        key={i}
                        className={`safety__numberDescriptionNumber safety__numberDescriptionNumber--${
                          i + 1
                        }`}
                      >
                        {i + 1}
                      </li>
                    ))}
                  </ul>
                  {safetyInfoContent.map((el, i) => (
                    <div key={i} className="safety__numberDescriptionContainer">
                      <span className="safety__numberDescriptionNumber">
                        {i + 1}
                      </span>
                      <h2 className="safety__numberDescriptionTitle">
                        {el.title}
                      </h2>
                      <p className="safety__numberDescriptionText">
                        {el.paragraph}
                      </p>
                    </div>
                  ))}
                </>
              ) : (
                <div className="safety__learnMoreAnimatedElements">
                  {safetyInfoContent.map((el, i) => (
                    <SafetyAnimatedElement
                      key={i}
                      show={phoneLayout ? false : !learnMoreOn}
                      title={el.title}
                      paragraph={el.paragraph}
                      elementClassNames={`safety__learnMoreAnimatedElements__element--${
                        i + 1
                      }`}
                      customLineClassNames={`safety__learnMoreAnimatedElements__line--${
                        i + 1
                      }`}
                      customParagraphClassNames={`safety__learnMoreAnimatedElements__paragraph--${
                        i + 1
                      }`}
                      customDotClassNames={`safety__learnMoreAnimatedElements__dot--${
                        i + 1
                      }`}
                      customTitleClassNames={`safety__learnMoreAnimatedElements__title--${
                        i + 1
                      }`}
                    />
                  ))}
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
      safetyInfoContent,
    ]);

    const renderSafetySection = useCallback(() => {
      const checkRenderInfo =
        pageIndex === "1" || (phoneLayout && sectionTop <= 300);

      /* Button logic */
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

      /* Render */
      return (
        <>
          <div className="safety__container">
            <SideComponents
              title="High Impact Protection"
              subtitle="Safety"
              paragraph="Model S is built from the ground up as an electric vehicle,with high-strength architecture and a floor-mounted batterypack allowing for incredible impact protection."
              customClassNames="safety__sideComponent"
              customParagraphClassNames="safety__paragraph"
              customInnerContainerClassNames="safety__sideInnerContainer"
              titleCustomClassNames="safety__title"
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

    /* Final Render of the section */
    return (
      <section ref={sectionRef} className="safety section">
        {renderSafetySection()}
      </section>
    );
  }
);
