import React, { useCallback } from "react";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import { connect } from "react-redux";
import CountUp from "react-countup";
import OrderButton from "../Buttons/OrderButton";
import InfoElement from "./InfoElement";

const mapStateToProps = (state) => ({
  loaded: state.page.loaded,
  pageIndex: state.models.pageIndex,
});

export default connect(mapStateToProps)(
  ({ image, title, loaded, pageIndex }) => {
    /* svgElement */
    const svgSpeed = (
      <svg
        version="1.1"
        id="L2"
        xmlns="http://www.w3.org/2000/svg"
        // xmlnXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 -1 50 40"
        enableBackground="new 0 0 50 20"
        xmlSpace="preserve"
      >
        <path
          id="d87ad07d 2640 4933 80f4 8c7bec5a0faa"
          d="M30.0073 15.2901C18.8886 15.3048 9.88493 24.3085 9.87024 35.4272C9.85556 38.4382 10.5312 41.4051 11.8384 44.1224C12.0881 44.6365 12.705 44.8568 13.2191 44.6071C13.7332 44.3574 13.9535 43.7405 13.7038 43.2264C9.41492 34.2228 13.2191 23.4419 22.2228 19.1383C31.2117 14.8348 41.9926 18.6389 46.2962 27.6426C48.6022 32.4749 48.6463 38.071 46.4284 42.9327C46.1934 43.4615 46.4137 44.0783 46.9425 44.3133C47.4712 44.5484 48.0881 44.328 48.3231 43.7993C52.9498 33.6793 48.4994 21.7234 38.3794 17.1114C35.7356 15.907 32.8862 15.2901 30.0073 15.2901Z"
          fill="#333333"
        />

        <line
          fill="#333333"
          strokeLinecap="round"
          stroke="#333333"
          strokeWidth="4"
          strokeMiterlimit="10"
          x1="20"
          y1="40"
          x2="30"
          y2="40"
        >
          <animateTransform
            attributeName="transform"
            dur="1s"
            type="rotate"
            from="0 30 40"
            to="170 30 40"
            fill="freeze"
            begin="0.5s"
          />
        </line>
      </svg>
    );
    /* Render functionality */
    const renderContent = useCallback(() => {
      /* ModelS CountUp Element */
      const countUpElement = (
        <CountUp
          delay={0.5}
          end={2.3}
          duration={3}
          suffix={"s"}
          decimals={1}
          useEasing
        />
      );

      /* Animation Settings */
      let styleTitle = {};
      let styleFirstComponent = {};
      let styleSecondComponent = {};
      let styleThirdComponent = {};
      let styleButtonComponent = {};
      let styleIconComponent = {};
      if (loaded) {
        styleTitle = { animation: "titleApper .3s .1s ease-in-out forwards" };
        styleFirstComponent = {
          animation: "subTitleAppear .2s .2s ease-in-out forwards",
        };
        styleSecondComponent = {
          animation: "subTitleAppear .2s .4s ease-in-out forwards",
        };
        styleThirdComponent = {
          animation: "subTitleAppear .2s .6s ease-in-out forwards",
        };
        styleButtonComponent = {
          opacity: 0,
          animation: "subTitleAppear .2s .8s ease-in-out forwards",
        };
        styleIconComponent = {
          animation: "subTitleAppear .2s 1s ease-in-out forwards",
        };
      }
      const modelSInfoElements = [
        {
          style: styleFirstComponent,
          svg: svgSpeed,
          title: countUpElement,
          firstText: "From 0-60 mph",
          secondText: null,
          width: "13rem",
          showLine: true,
        },
        {
          style: styleSecondComponent,
          svg: null,
          title: "28 cu ft",
          firstText: "Best in Class",
          secondText: "Storage",
          showLine: true,
        },
        {
          style: styleThirdComponent,
          svg: null,
          title: "402 mi",
          firstText: "Range",
          secondText: "(EPA est.)",
        },
      ];
      const renderInfoElement = () => {
        return modelSInfoElements.map((el) => (
          <InfoElement
            key={el.title}
            title={el.title}
            style={el.style}
            svg={el.svg}
            firstText={el.firstText}
            secondText={el.secondText}
            width={el.width}
            showLine={el.showLine}
          />
        ));
      };
      if (pageIndex === "0") {
        return (
          <>
            <h1 style={styleTitle} className="firstSection__title">
              {title}
            </h1>
            <div className="firstSection__characteristics">
              {renderInfoElement()}
              <OrderButton userStyles={styleButtonComponent} />
            </div>
            <ExpandMoreOutlinedIcon
              style={styleIconComponent}
              className="firstSection__icon"
            />
          </>
        );
      } else {
        return null;
      }
    }, [loaded, pageIndex, svgSpeed, title]);
    return (
      <section
        className="section firstSection"
        style={{ background: `url(${image})` }}
      >
        <div className="firstSection__content">{renderContent()}</div>
      </section>
    );
  }
);
