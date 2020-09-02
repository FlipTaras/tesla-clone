import React from "react";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import { Transition } from "react-transition-group";
import classnames from "classnames";
import { connect } from "react-redux";

/* Animation Settings */
const defaultStyle = { transition: "opacity .2s ease-in-out", opacity: 1 };
const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};
const mapStateToProps = (state) => ({
  loaded: state.page.loaded,
});
export default connect(mapStateToProps)(
  ({ title, active, subtitle, loaded }) => {
    const orderComponentClassNames = classnames(
      "orderComponent",
      title === "Accessories" && "orderComponent--last"
    );
    const titleBig =
      title === "Solar for New Roofs" ||
      title === "Only $1.49/Watt for Solar on Existing Roofs";

    const titleClassNames = classnames(
      "orderComponent__title",
      titleBig && "orderComponent__title--big"
    );

    const firstButtonClassNames = classnames(
      "orderComponent__buttons",
      title === "Model Y" && "orderComponent__buttons--first"
    );
    const renderSubtitle = () =>
      title !== "Accessories" && (
        <h2 style={styleSubtitle} className="orderComponent__subtitle">
          {subtitle ? (
            <span>{subtitle}</span>
          ) : (
            <span>
              Order Online for <a href="/">Touchless Delivery</a>
            </span>
          )}
        </h2>
      );
    const renderButtons = () =>
      title !== "Accessories" ? (
        <div className={firstButtonClassNames}>
          <a
            style={styleLeftButton}
            href="/"
            className="orderComponent__button orderComponent__button--dark"
          >
            Custom Order
          </a>
          <a
            style={styleRightButton}
            href="/"
            className="orderComponent__button orderComponent__button--light"
          >
            Learn More
          </a>
          {title === "Model Y" && (
            <div
              style={styleArrowDown}
              className="orderComponent__iconContainer"
            >
              <ExpandMoreOutlinedIcon className="orderComponent__icon" />
            </div>
          )}
        </div>
      ) : (
        <div className="orderComponent__buttons orderComponent__buttons--acces">
          <a
            className="orderComponent__button orderComponent__button--acces"
            href="/"
          >
            Shop Now
          </a>
        </div>
      );
    let styleTitle = {};
    let styleSubtitle = {};
    let styleLeftButton = {};
    let styleRightButton = {};
    let styleArrowDown = {};
    if (loaded) {
      styleTitle = { animation: "titleApper .6s .5s ease-in-out forwards" };
      styleSubtitle = {
        animation: "subTitleAppear .2s 1.1s ease-in-out forwards",
      };
      styleLeftButton = {
        animation: "leftButtonAppear .5s 1s ease-in-out forwards",
      };
      styleRightButton = {
        animation: "rightButtonAppear .5s 1s ease-in-out forwards",
      };
      styleArrowDown = {
        animation: "arrowDownApper 1s 1.4s ease forwards",
      };
    }
    return (
      <Transition in={active} timeout={200}>
        {(state) => (
          <div
            style={{ ...defaultStyle, ...transitionStyles[state] }}
            className={orderComponentClassNames}
          >
            <div>
              <h1 style={styleTitle} className={titleClassNames}>
                {title}
              </h1>
              {renderSubtitle()}
            </div>
            {renderButtons()}
          </div>
        )}
      </Transition>
    );
  }
);
