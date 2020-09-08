import React, { useState } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { setPageIndex } from "../static/store/actions";

const mapActionToProps = {
  setPageIndex,
};

export default connect(
  null,
  mapActionToProps
)(({ model, pageIndex, setPageIndex }) => {
  const [active, setActive] = useState("model");
  const [dark, setDark] = useState(true);

  /* Change the active class when user changing the section */
  const darkAndActiveCheck = () => {
    const index = document.querySelector("body").classList.value.split("-")[2];
    setPageIndex(index);
    setActive(ButtonElements[index]?.title);
    if (ButtonElements[index]?.dark) {
      setDark(true);
    } else {
      setDark(false);
    }
  };
  const clickHandler = (index, el) => {
    if (window.fullpage_api) {
      setActive(el.title);
      window.fullpage_api.moveTo(index);
      darkAndActiveCheck();
    }
  };
  window.addEventListener("wheel", () => darkAndActiveCheck());
  /* For Phones */
  window.addEventListener("touchmove", () => darkAndActiveCheck());

  const elementClassNamesColor = classnames(
    dark ? "fullpage__element--dark" : "fullpage__element--light"
  );

  const linkClassNames = classnames(
    "fullpage__link",
    dark ? "fullpage__link--dark" : "fullpage__link--light"
  );

  const ButtonElements = [
    {
      link: "#model",
      active: true,
      className: classnames(
        "fullpage__element fullpage__element--dark",
        active === "model" && "fullpage__element--active"
      ),
      dark: true,
      title: "model",
    },
    {
      link: "#safety",
      active: false,
      className: classnames(
        "fullpage__element fullpage__element--dark",
        active === "safety" && "fullpage__element--active"
      ),
      dark: true,
      title: "safety",
    },
    {
      link: "#perfomance",
      active: false,
      className: classnames(
        "fullpage__element fullpage__element--dark",
        active === "perfomance" && "fullpage__element--active"
      ),
      dark: false,
      title: "perfomance",
    },
    {
      link: "#range",
      active: false,
      className: classnames(
        "fullpage__element fullpage__element--dark",
        active === "range" && "fullpage__element--active"
      ),
      dark: false,
      title: "range",
    },
    {
      link: "#autopilot",
      active: false,
      className: classnames(
        "fullpage__element fullpage__element--dark",
        active === "autopilot" && "fullpage__element--active"
      ),
      dark: true,
      title: "autopilot",
    },
    {
      link: "#interior",
      active: false,
      className: classnames(
        "fullpage__element fullpage__element--dark",
        active === "interior" && "fullpage__element--active"
      ),
      dark: false,
      title: "interior",
    },
    {
      link: "#exterior",
      active: false,
      className: classnames(
        "fullpage__element fullpage__element--dark",
        active === "exterior" && "fullpage__element--active"
      ),
      dark: true,
      title: "exterior",
    },
    {
      link: "#specs",
      active: false,
      className: classnames(
        "fullpage__element fullpage__element--dark",
        active === "specs" && "fullpage__element--active"
      ),
      dark: false,
      title: "specs",
    },
    {
      link: "#order",
      active: false,
      className: classnames(
        "fullpage__element fullpage__element--dark",
        active === "order" && "fullpage__element--active"
      ),
      dark: true,
      title: "order",
    },
  ];

  return (
    <div id="fp-nav" className="fullpage">
      <ul className="fullpage__buttons">
        {ButtonElements.map((el, index) => (
          <li
            onClick={() => clickHandler(index + 1, el)}
            key={index}
            className={classnames(el.className, elementClassNamesColor)}
          >
            <a href={el.link} className={linkClassNames}>
              {el.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
});
