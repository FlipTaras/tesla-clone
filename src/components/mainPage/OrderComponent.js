import React, { useCallback } from "react";
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
    /* Light Button ClassNames */
    const lightButtonClassNames = classnames(
      "orderComponent__button",
      "orderComponent__button--light",
      title === "Accessories" && "orderComponent__button--none"
    );

    /* Order Component ClassNames */
    const orderComponentClassNames = classnames(
      "orderComponent",
      title === "Accessories" && "orderComponent--last"
    );
    /* Title ClassNames */
    const titleBig =
      title === "Solar for New Roofs" ||
      title === "Only $1.49/Watt for Solar on Existing Roofs";

    const titleClassNames = classnames(
      "orderComponent__title",
      titleBig && "orderComponent__title--big"
    );

    /* Button ClassNames */
    const firstButtonClassNames = classnames(
      "orderComponent__buttons",
      title === "Model Y" && "orderComponent__buttons--first"
    );

    /* Render Functionality */
    const renderSubtitle = useCallback(
      () =>
        subtitle ? (
          <span>{subtitle}</span>
        ) : (
          <span>
            Order Online for <a href="/">Touchless Delivery</a>
          </span>
        ),
      [subtitle]
    );
    /* Animation Settings */

    let styleTitle = {};
    let styleSubtitle = {};
    if (loaded) {
      styleTitle = { animation: "titleApper .6s .5s ease-in-out forwards" };
      styleSubtitle = {
        animation: "subTitleAppear .2s 1.1s ease-in-out forwards",
      };
    }
    const renderButtons = useCallback(() => {
      /* Animation Settings */

      let styleLeftButton = {};
      let styleRightButton = {};
      let styleArrowDown = {};
      if (loaded) {
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
        <>
          <a
            style={styleLeftButton}
            href="/"
            className={
              title === "Accessories"
                ? "orderComponent__button orderComponent__button--acces"
                : "orderComponent__button orderComponent__button--dark"
            }
          >
            {title === "Accessories" ? "Shop Now" : "Custom Order"}
          </a>
          <a
            style={styleRightButton}
            href="/"
            className={lightButtonClassNames}
          >
            Learn More
          </a>
          <div
            style={
              title === "Accessories" ? { display: "none" } : styleArrowDown
            }
            className="orderComponent__iconContainer"
          >
            {title === "Model Y" && (
              <ExpandMoreOutlinedIcon className="orderComponent__icon" />
            )}
          </div>
        </>
      );
    }, [lightButtonClassNames, title, loaded]);

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
              <h2 style={styleSubtitle} className="orderComponent__subtitle">
                {title === "Accessories" ? "" : renderSubtitle()}
              </h2>
            </div>
            <div
              className={
                title === "Accessories"
                  ? "orderComponent__buttons orderComponent__buttons--acces"
                  : firstButtonClassNames
              }
            >
              {renderButtons()}
            </div>
          </div>
        )}
      </Transition>
    );
  }
);
