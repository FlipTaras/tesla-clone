import React, { useEffect, useCallback } from "react";

import { connect } from "react-redux";
import { setPageToShow, setSilentScrollTo } from "../../static/store/actions";
import OrderButton from "../Buttons/OrderButton";
import LearnMoreButton from "../Buttons/LearnMoreButton";
import SafetyAnimatedElement from "./SafetyAnimatedElement";
import CloseNextButton from "../Buttons/CloseNextButton";

/* Images */
import ModelsStructureInitial from "../../static/images/ModelS/Safety.png";
import ModelsStructureLeanMore from "../../static/images/ModelS/model-s-supportive-structure.jpg";
import ModelsImageMobile from "../../static/images/ModelS/Safety-mobile.jpg";

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
    topContainerRef,
    bottomContainerRef,
    pageYOffset,
    width,
    height,
  }) => {
    const checkIpadAndWidthSmaller1024 =
      (width === 1024 && height === 1366) || width < 1024;
    const checkIpad = width === 1024 && height === 1366;
    /* Scroll Learn more page into view */
    useEffect(() => {
      if (learnMoreOn) {
        window.scrollTo({ top: 755, behavior: "smooth" });
      }
    }, [learnMoreOn]);

    /* Render functionality */
    const renderSafetyLeft = useCallback(() => {
      const LearnMoreHandler = () => {
        setPageToShow("safety");
      };
      if (pageIndex === "1") {
        return (
          <>
            <div
              ref={topContainerRef}
              className={
                learnMoreOn
                  ? "safety__topContainer safety__topContainer--show "
                  : "safety__topContainer"
              }
            >
              <div className="safety__titleContainer">
                <h2 className="subtitle">Safety</h2>
                <h1 className="title">High Impact Protection</h1>
              </div>
              <div className="safety__paragraphContainer">
                <p className="safety__paragraph paragraph">
                  Model S is built from the ground up as an electric vehicle,
                  with high-strength architecture and a floor-mounted battery
                  pack allowing for incredible impact protection.
                </p>
              </div>
            </div>
            <div
              ref={bottomContainerRef}
              className={
                learnMoreOn
                  ? "safety__bottomContainer safety__bottomContainer--show"
                  : "safety__bottomContainer"
              }
            >
              <LearnMoreButton
                disabled={learnMoreOn}
                click={LearnMoreHandler}
              />
              <OrderButton />
            </div>
          </>
        );
      } else {
        return null;
      }
    }, [
      learnMoreOn,
      pageIndex,
      setPageToShow,
      bottomContainerRef,
      topContainerRef,
    ]);

    const renderSaferyRight = useCallback(() => {
      if (pageIndex === "1") {
        return (
          <>
            <div className="safety__AnimatedElements">
              <SafetyAnimatedElement
                show={learnMoreOn}
                title="Front-Impact Protection"
                titleAnimation="translateYOpacityShow .8s .5s forwards ease"
                elementTop={checkIpad ? "25%" : "20%"}
                elementLeft="26%"
                lineTop="1rem"
                lineLeft="-1rem"
                lineHeight="23rem"
                lineAnimation="showstickScaleY .7s .2s forwards ease-in-out"
                dotTop="24rem"
                dotLeft="-1.3rem"
                dotAnimation="showdot .8s .8s forwards ease"
              />
              <SafetyAnimatedElement
                show={learnMoreOn}
                title="Side-Impact Protection"
                titleAnimation="translateYOpacityShow .8s .5s forwards ease"
                elementTop={
                  checkIpad
                    ? "22%"
                    : width >= 1024
                    ? "19%"
                    : width >= 768
                    ? "23%"
                    : "11%"
                }
                elementLeft={width >= 1280 ? "52%" : "47%"}
                lineTop="1rem"
                lineLeft="-1rem"
                lineHeight={
                  width >= 2560
                    ? "16rem"
                    : width >= 1920
                    ? "25rem"
                    : width >= 1600
                    ? "14rem"
                    : width >= 1336
                    ? "11rem"
                    : width >= 1280
                    ? "25rem"
                    : "12rem"
                }
                lineAnimation="showstickScaleY .7s .2s forwards ease-in-out"
                dotTop={
                  width >= 2560
                    ? "17rem"
                    : width >= 1920
                    ? "26rem"
                    : width >= 1600
                    ? "15rem"
                    : width >= 1336
                    ? "12rem"
                    : width >= 1280
                    ? "26rem"
                    : "13rem"
                }
                dotLeft="-1.3rem"
                dotAnimation="showdot .8s .8s forwards ease"
              />
              <SafetyAnimatedElement
                show={learnMoreOn}
                title="Very Low Rollover Risk"
                titleAnimation="translateYOpacityShow .8s .5s forwards ease"
                elementBottom={checkIpad ? "30%" : "24%"}
                elementRight={
                  width >= 1920
                    ? "40%"
                    : checkIpad
                    ? "30%"
                    : width >= 1280
                    ? "30%"
                    : width >= 1024
                    ? "20%"
                    : "35%"
                }
                lineBottom="0"
                lineLeft="-1rem"
                lineHeight={
                  width >= 1920
                    ? "25rem"
                    : width >= 1600
                    ? "15rem"
                    : width >= 1336
                    ? "12rem"
                    : width >= 1280
                    ? "25rem"
                    : "13rem"
                }
                lineAnimation="showstickScaleY .7s .2s forwards ease-in-out"
                dotBottom={
                  width >= 1920
                    ? "24rem"
                    : width >= 1600
                    ? "15rem"
                    : width >= 1336
                    ? "12rem"
                    : width >= 1280
                    ? "25rem"
                    : "13rem"
                }
                dotLeft="-1.3rem"
                dotAnimation="showdot .8s .8s forwards ease"
              />
            </div>
          </>
        );
      } else {
        return null;
      }
    }, [learnMoreOn, pageIndex, width, checkIpad]);

    const renderLearnMoreSection = useCallback(() => {
      const CloseHandler = () => {
        setPageToShow(null);
        setSilentScrollTo("safety");
      };
      const NextHandler = () => {
        setPageToShow(null);
        setSilentScrollTo("perfomance");
      };
      if (learnMoreOn) {
        return (
          <div className="safety__learnMoreContainer">
            <div className="safety__learnMoreInnerContainer">
              <div className="safety__learnMoreTopContainer">
                <h1 className="title title--animated">Built for Safety</h1>
                <p className="paragraph paragraph--animated">
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
                <div className="safety__AnimatedElements">
                  <SafetyAnimatedElement
                    show={!learnMoreOn}
                    title="Front-Impact Protection"
                    titleFont="Gotham Bold"
                    titleAnimation="translateYOpacityShowFromTop .8s .8s forwards ease"
                    text="There is no internal combustion engine in Model S, so the crumple zone has greater opportunity to minimize occupant deceleration in the event of frontal impact."
                    textAnimation="translateYOpacityShowFromTop .8s .6s forwards ease"
                    elementBottom="0"
                    elementLeft={width === 1024 ? "15%" : "22%"}
                    lineBottom="-17rem"
                    lineLeft="-1rem"
                    lineHeight={
                      width >= 1366
                        ? "43rem"
                        : width >= 1280
                        ? "40rem"
                        : "45rem"
                    }
                    lineAnimation="showstickScaleYTop .7s .4s forwards ease-in-out"
                    dotBottom={
                      width >= 1366
                        ? "26rem"
                        : width >= 1280
                        ? "23rem"
                        : "28rem"
                    }
                    dotLeft="-1.3rem"
                    dotAnimation="showdot .8s .2s forwards ease"
                  />
                  <SafetyAnimatedElement
                    show={!learnMoreOn}
                    title="Side-Impact Protection"
                    titleFont="Gotham Bold"
                    titleAnimation="translateYOpacityShowFromTop .8s 1s forwards ease"
                    text="The combination of a high-strength central pillar and an energy-absorbing sill structure provides exceptional protection to both the occupant and the under-floor mounted battery pack."
                    textAnimation="translateYOpacityShowFromTop .8s .8s forwards ease"
                    elementBottom="0"
                    elementLeft={width >= 1280 ? "44%" : "41%"}
                    lineBottom="-17rem"
                    lineLeft="-1rem"
                    lineHeight={width >= 1280 ? "52rem" : "54rem"}
                    lineAnimation="showstickScaleYTop .7s .6s forwards ease-in-out"
                    dotBottom={width >= 1280 ? "35rem" : "37rem"}
                    dotLeft="-1.3rem"
                    dotAnimation="showdot .8s .2s forwards ease"
                  />
                  <SafetyAnimatedElement
                    show={!learnMoreOn}
                    title="Very Low Rollover Risk"
                    titleFont="Gotham Bold"
                    titleAnimation="translateYOpacityShowFromTop .8s 1.2s forwards ease"
                    text="The position and weight of the floor-mounted battery pack provides a very low center of gravity—allowing for a very low rollover risk."
                    textAnimation="translateYOpacityShowFromTop .8s 1s forwards ease"
                    elementBottom="0"
                    elementRight={
                      width >= 1366
                        ? "20%"
                        : width >= 1280
                        ? "18%"
                        : width >= 1024
                        ? "10%"
                        : "30%"
                    }
                    lineBottom="-17rem"
                    lineLeft="-1rem"
                    lineHeight="45rem"
                    lineAnimation="showstickScaleYTop .7s .8s forwards ease-in-out"
                    dotBottom="28rem"
                    dotLeft="-1.3rem"
                    dotAnimation="showdot .8s .2s forwards ease"
                  />
                </div>
              )}
            </div>
            <CloseNextButton
              close={pageYOffset < 900}
              click={pageYOffset < 900 ? CloseHandler : NextHandler}
            />
          </div>
        );
      } else {
        return null;
      }
    }, [
      learnMoreOn,
      setPageToShow,
      setSilentScrollTo,
      pageYOffset,
      width,
      checkIpadAndWidthSmaller1024,
    ]);

    return (
      <section className="safety section">
        <div className="safety__container">
          <div className="safety__left">{renderSafetyLeft()}</div>
          <div
            style={
              checkIpad
                ? { background: "none" }
                : width >= 1024
                ? { background: `url(${ModelsStructureInitial})` }
                : { background: "none" }
            }
            className="safety__right"
          >
            {checkIpad ? (
              <img
                className="safety__backgroundImage"
                src={width <= 640 ? ModelsImageMobile : ModelsStructureInitial}
                alt="car"
              />
            ) : (
              width < 1024 && (
                <img
                  className="safety__backgroundImage"
                  src={
                    width <= 640 ? ModelsImageMobile : ModelsStructureInitial
                  }
                  alt="car"
                />
              )
            )}
            {renderSaferyRight()}
          </div>
        </div>
        {renderLearnMoreSection()}
      </section>
    );
  }
);
