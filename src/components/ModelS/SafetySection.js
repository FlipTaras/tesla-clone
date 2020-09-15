import React, { useEffect, useCallback } from "react";
import ModelsStructureInitial from "../../static/images/ModelS/Safety.png";
import ModelsStructureLeanMore from "../../static/images/ModelS/model-s-supportive-structure.jpg";
import { connect } from "react-redux";
import { setPageToShow, setSilentScrollTo } from "../../static/store/actions";
import OrderButton from "../Buttons/OrderButton";
import LearnMoreButton from "../Buttons/LearnMoreButton";
import SafetyAnimatedElement from "./SafetyAnimatedElement";
import CloseNextButton from "../Buttons/CloseNextButton";

const mapStateToProps = (state) => ({
  pageIndex: state.models.pageIndex,
  pageYOffset: state.page.pageYOffset,
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
  }) => {
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
              <h2 className="subtitle">Safety</h2>
              <h1 className="title">High Impact Protection</h1>
              <p style={{ width: "80%" }} className="paragraph">
                Model S is built from the ground up as an electric vehicle, with
                high-strength architecture and a floor-mounted battery pack
                allowing for incredible impact protection.
              </p>
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
          <div className="safety__AnimatedElements">
            <SafetyAnimatedElement
              show={learnMoreOn}
              title="Front-Impact Protection"
              titleAnimation="translateYOpacityShow .8s .5s forwards ease"
              elementTop="20%"
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
              elementTop="11%"
              elementLeft="47%"
              lineTop="1rem"
              lineLeft="-1rem"
              lineHeight="12rem"
              lineAnimation="showstickScaleY .7s .2s forwards ease-in-out"
              dotTop="13rem"
              dotLeft="-1.3rem"
              dotAnimation="showdot .8s .8s forwards ease"
            />
            <SafetyAnimatedElement
              show={learnMoreOn}
              title="Very Low Rollover Risk"
              titleAnimation="translateYOpacityShow .8s .5s forwards ease"
              elementBottom="24%"
              elementRight="35%"
              lineBottom="0"
              lineLeft="-1rem"
              lineHeight="13rem"
              lineAnimation="showstickScaleY .7s .2s forwards ease-in-out"
              dotTop="1rem"
              dotLeft="-1.3rem"
              dotAnimation="showdot .8s .8s forwards ease"
            />
          </div>
        );
      } else {
        return null;
      }
    }, [learnMoreOn, pageIndex]);

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
                <p
                  style={{ width: "40%" }}
                  className="paragraph paragraph--animated"
                >
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
              <div className="safety__AnimatedElements">
                <SafetyAnimatedElement
                  show={!learnMoreOn}
                  title="Front-Impact Protection"
                  titleFont="Gotham Bold"
                  titleAnimation="translateYOpacityShowFromTop .8s .8s forwards ease"
                  text="There is no internal combustion engine in Model S, so the crumple zone has greater opportunity to minimize occupant deceleration in the event of frontal impact."
                  textAnimation="translateYOpacityShowFromTop .8s .6s forwards ease"
                  elementBottom="0"
                  elementLeft="22%"
                  lineBottom="-17rem"
                  lineLeft="-1rem"
                  lineHeight="45rem"
                  lineAnimation="showstickScaleYTop .7s .4s forwards ease-in-out"
                  dotBottom="28rem"
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
                  elementLeft="41%"
                  lineBottom="-17rem"
                  lineLeft="-1rem"
                  lineHeight="54rem"
                  lineAnimation="showstickScaleYTop .7s .6s forwards ease-in-out"
                  dotBottom="37rem"
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
                  elementRight="30%"
                  lineBottom="-17rem"
                  lineLeft="-1rem"
                  lineHeight="45rem"
                  lineAnimation="showstickScaleYTop .7s .8s forwards ease-in-out"
                  dotBottom="28rem"
                  dotLeft="-1.3rem"
                  dotAnimation="showdot .8s .2s forwards ease"
                />
              </div>
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
    }, [learnMoreOn, setPageToShow, setSilentScrollTo, pageYOffset]);

    return (
      <section className="safety section">
        <div className="safety__container">
          <div className="safety__left">{renderSafetyLeft()}</div>
          <div
            style={{ background: `url(${ModelsStructureInitial})` }}
            className="safety__right"
          >
            {renderSaferyRight()}
          </div>
        </div>
        {renderLearnMoreSection()}
      </section>
    );
  }
);
