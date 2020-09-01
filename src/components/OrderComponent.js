import React from "react";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import { Transition } from "react-transition-group";
import classnames from "classnames";

/* Animation Settings */
const defaultStyle = { transition: "opacity .2s ease-in-out", opacity: 1 };
const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

export default ({ title, active, subtitle }) => {
  const titleBig =
    title === "Solar for New Roofs" ||
    title === "Only $1.49/Watt for Solar on Existing Roofs";

  const titleClassNames = classnames(
    "orderComponent__title",
    titleBig && "orderComponent__title--big"
  );
  const renderSubtitle = () =>
    title !== "Accessories" && (
      <h2 className="orderComponent__subtitle">
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
      <div className="orderComponent__buttons">
        <a
          href="/"
          className="orderComponent__button orderComponent__button--dark"
        >
          Custom Order
        </a>
        <a
          href="/"
          className="orderComponent__button orderComponent__button--light"
        >
          Learn More
        </a>
        <br />
        {title === "Model Y" && (
          <ExpandMoreOutlinedIcon className="orderComponent__icon" />
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
  return (
    <Transition in={active} timeout={200}>
      {(state) => (
        <div
          style={{ ...defaultStyle, ...transitionStyles[state] }}
          className="orderComponent"
        >
          <h1 className={titleClassNames}>{title}</h1>
          {renderSubtitle()}
          {renderButtons()}
        </div>
      )}
    </Transition>
  );
};
