import React from "react";
import Image from "../../static/images/ModelS/Safety.png";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  pageIndex: state.page.pageIndex,
});

export default connect(mapStateToProps)(({ pageIndex }) => {
  console.log(pageIndex);
  return (
    <div className="safety section">
      <div className="safety__container">
        <div className="safety__left">
          {pageIndex === "1" && (
            <>
              <div className="safety__topContainer">
                <h2 className="safety__subtitle">Safety</h2>
                <h1 className="safety__title">High Impact Protection</h1>
                <p className="safety__text">
                  Model S is built from the ground up as an electric vehicle,
                  with high-strength architecture and a floor-mounted battery
                  pack allowing for incredible impact protection.
                </p>
              </div>
              <div className="safety__bottomContainer">
                <button className="safety__learn">
                  <i className="safety__icon">&#43;</i>
                  <span className="safety__learnText">Learn More</span>
                </button>
                <button className="safety__orderNow">Order Now</button>
              </div>
            </>
          )}
        </div>
        <div style={{ background: `url(${Image})` }} className="safety__right">
          {pageIndex === "1" && (
            <>
              <ul className="safety__list">
                <li className="safety__listElement safety__listElement--1">
                  <span className="safety__listText">
                    Front-Impact Protection
                  </span>
                </li>
                <li className="safety__listElement safety__listElement--2">
                  <span className="safety__listText">
                    Side-Impact Protection
                  </span>
                </li>
                <li className="safety__listElement safety__listElement--3">
                  <span className="safety__listText">
                    Very Low Rollover Risk
                  </span>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
});
