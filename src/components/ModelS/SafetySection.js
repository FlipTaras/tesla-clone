import React, { useEffect } from "react";
import ModelsStructureInitial from "../../static/images/ModelS/Safety.png";
import ModelsStructureLeanMore from "../../static/images/ModelS/model-s-supportive-structure.jpg";
import { connect } from "react-redux";
import { setPageToShow, setSilentScrollTo } from "../../static/store/actions";
import OrderButton from "../OrderButton";
import LearnMoreButton from "../LearnMoreButton";

const mapStateToProps = (state) => ({
  pageIndex: state.page.pageIndex,
});

const mapActionToProps = {
  setPageToShow,
  setSilentScrollTo,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(({ pageIndex, learnMoreOn, setPageToShow, setSilentScrollTo }) => {
  const LearnMoreHandler = () => {
    setPageToShow("safety");
  };
  const CloseHandler = () => {
    setPageToShow(null);
    setSilentScrollTo("safety");
  };
  useEffect(() => {
    if (learnMoreOn) {
      window.scrollTo({ top: 755, behavior: "smooth" });
    }
  }, [learnMoreOn]);

  const renderSafetyLeft = () => {
    if (pageIndex === "1") {
      return (
        <>
          <div
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
            className={
              learnMoreOn
                ? "safety__bottomContainer safety__bottomContainer--show"
                : "safety__bottomContainer"
            }
          >
            <LearnMoreButton disabled={learnMoreOn} click={LearnMoreHandler} />
            <OrderButton />
          </div>
        </>
      );
    } else {
      return null;
    }
  };

  const renderSaferyRight = () => {
    if (pageIndex === "1") {
      return (
        <>
          <ul className="safety__list">
            <li
              className={
                learnMoreOn
                  ? "safety__listElement safety__listElement--1 safety__listElement--1--show"
                  : "safety__listElement safety__listElement--1"
              }
            >
              <span
                className={
                  learnMoreOn
                    ? "safety__listText safety__listText--show"
                    : "safety__listText"
                }
              >
                Front-Impact Protection
              </span>
            </li>
            <li
              className={
                learnMoreOn
                  ? "safety__listElement safety__listElement--2 safety__listElement--2--show"
                  : "safety__listElement safety__listElement--2"
              }
            >
              <span
                className={
                  learnMoreOn
                    ? "safety__listText safety__listText--show"
                    : "safety__listText"
                }
              >
                Side-Impact Protection
              </span>
            </li>
            <li
              className={
                learnMoreOn
                  ? "safety__listElement safety__listElement--3 safety__listElement--3--show"
                  : "safety__listElement safety__listElement--3"
              }
            >
              <span
                className={
                  learnMoreOn
                    ? "safety__listText safety__listText--show"
                    : "safety__listText"
                }
              >
                Very Low Rollover Risk
              </span>
            </li>
          </ul>
        </>
      );
    } else {
      return null;
    }
  };
  return (
    <div className="safety section">
      <div className="safety__container">
        <div className="safety__left">{renderSafetyLeft()}</div>
        <div
          style={{ background: `url(${ModelsStructureInitial})` }}
          className="safety__right"
        >
          {renderSaferyRight()}
        </div>
      </div>
      {learnMoreOn && (
        <div className="safety__learnMoreContainer">
          <div className="safety__learnMoreInnerContainer">
            <div className="safety__learnMoreTopContainer">
              <h1 className="title">Built for Safety</h1>
              <p style={{ width: "40%" }} className="paragraph">
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
          </div>
          <button onClick={CloseHandler} className="closeButton">
            Close
          </button>
        </div>
      )}
    </div>
  );
});
