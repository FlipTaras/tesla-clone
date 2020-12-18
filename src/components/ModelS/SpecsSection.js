import React, { useState, useEffect, useRef, useCallback } from "react";
import ContentElement from "./ContentElement";
import SideComponents from "./SideComponents";
import classnames from "classnames";
import SpecsElement from "./SpecsElement";

import Image from "../../static/images/ModelS/Specs/Specs.jpg";
import ImageMobile from "../../static/images/ModelS/Specs/Specs-mobile.jpg";

/* Redux */
import { connect } from "react-redux";
import { setPageToShow, setSilentScrollTo } from "../../static/store/actions";
import OrderButton from "../Buttons/OrderButton";
import LearnMoreButton from "../Buttons/LearnMoreButton";

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
    const [activeButton, setActiveButton] = useState(1);

    /* Get section offset, used for Animation on small screens  */
    const sectionRef = useRef(null);
    const learnMoreSectionRef = useRef(null);
    const [sectionTop, setSectionTop] = useState(null);
    // const [learnMoreSectionTop, setLearnMoreSectionTop] = useState(null);
    // const [learnMoreSectionBottom, setLearnMoreSectionBottom] = useState(null);

    useEffect(() => {
      const getAndShowTop = () => {
        const rectSection = sectionRef.current.getBoundingClientRect();
        // const rectLearnMoreSection = learnMoreSectionRef.current?.getBoundingClientRect();
        setSectionTop(rectSection.top);
        // setLearnMoreSectionTop(rectLearnMoreSection.top);
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

    /* Render functionality */
    const renderSection = useCallback(() => {
      /* Check when section to show up */
      const checkRenderInfo =
        pageIndex === "7" || (phoneLayout && sectionTop <= 600);

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

      /* Specs Render */
      const renderSpecsContainer = () => {
        const firstColumn = [
          {
            title: "Battery",
            subtitle: "Long Range",
          },
          {
            title: "Acceleration",
            subtitle:
              activeButton === 1
                ? "2.3 seconds 0-60 mph"
                : "3.7 seconds 0-60 mph",
          },
          {
            title: "Range",
            subtitle:
              activeButton === 1
                ? "387 miles (EPA est.)"
                : "402 miles (EPA est.)",
          },
          {
            title: "Drive",
            subtitle: "All-Wheel Drive",
          },
          {
            title: "Seating",
            subtitle: "5 Adults",
          },
          {
            title: "Wheels",
            subtitle: "19” or 21”",
          },
        ];

        const secondColumn = [
          {
            title: "Weight",
            subtitle: activeButton === 1 ? "4,941 lbs" : "4,883 lbs",
          },
          {
            title: "Cargo",
            subtitle: "28 cu ft",
          },
          {
            title: "Displays",
            subtitle: 'Driver Display + 17" Touchscreen',
          },
          {
            title: "Supercharging Max/Payment Type",
            subtitle: "250 kW max; Pay Per Use",
          },
          {
            title: "Onboard Charger Max",
            subtitle: "11.5 kW max (48A)",
          },
          {
            title: "Warranty",
            subtitle:
              "Basic Vehicle - 4 years or 50,000 miles, whichever comes firstBattery & Drive Unit - 8 years or 150,000 miles, whichever comes first",
          },
        ];

        return (
          <div className="specs__specsContainer">
            <div className="specs__buttons">
              <OrderButton
                classNames={classnames(
                  "specs__button",
                  activeButton === 1 && "specs__button--active"
                )}
                customText="Perfomance"
                click={() => setActiveButton(1)}
              />
              <OrderButton
                classNames={classnames(
                  "specs__button",
                  activeButton === 2 && "specs__button--active"
                )}
                customText="Long Range Plus"
                click={() => setActiveButton(2)}
              />
            </div>
            <div className="specs__characteristicsContainer">
              <div className="specs__left">
                {/* <OrderButton
                classNames={classnames(
                  "specs__button",
                  activeButton === 1 && "specs__button--active"
                )}
                customText="Perfomance"
                click={() => setActiveButton(1)}
              /> */}
                <div className="specs__elementsContainer">
                  {firstColumn.map((el, i) => (
                    <SpecsElement
                      key={i}
                      title={el.title}
                      subtitle={el.subtitle}
                    />
                  ))}
                  {width > 800 && (
                    <LearnMoreButton
                      classNames="specs__learnMore"
                      white
                      customLearnMoreText="Expand List"
                      disabled
                    />
                  )}
                </div>
              </div>
              <div className="specs__right">
                {/* <OrderButton
                classNames={classnames(
                  "specs__button",
                  activeButton === 2 && "specs__button--active"
                )}
                customText="Long Range Plus"
                click={() => setActiveButton(2)}
              /> */}
                <div className="specs__elementsContainer">
                  {secondColumn.map((el, i) => (
                    <SpecsElement
                      key={i}
                      title={el.title}
                      subtitle={el.subtitle}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      };
      /* Reder */
      return (
        <>
          <ContentElement
            customContentElementClassNames="specs__contentElement"
            horizontal={false}
          >
            <img
              className="specs__backgroundImage"
              src={width > 800 ? Image : ImageMobile}
              alt="ModelS"
            />
          </ContentElement>
          <SideComponents
            title="Model S Specs"
            titleCustomClassNames="specs__title"
            customInnerContainerClassNames="specs__innerContainer"
            customClassNames="specs__sideComponent"
            horizontal={false}
            checkRenderInfo={checkRenderInfo}
            learnMoreOn={learnMoreOn}
            showLearnMore={showLearnMore}
            learnMoreHandle={learnMoreHandler}
            showSection={true}
            noOrder
            white
            noLearnMore={width > 800}
            customLearnMoreText="Expand List"
            disabled
          >
            {renderSpecsContainer()}
          </SideComponents>
          <div
            ref={learnMoreSectionRef}
            className="exterior__learnMoreContainer"
          ></div>
        </>
      );
    }, [
      pageIndex,
      phoneLayout,
      sectionTop,
      setPageToShow,
      learnMoreOn,
      showLearnMore,
      width,
      activeButton,
    ]);
    return (
      <section className="section specs">
        <div className="specs__container">{renderSection()}</div>
      </section>
    );
  }
);
