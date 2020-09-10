import React from "react";
import classnames from "classnames";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { setNavbar } from "../../static/store/actions";

const mapActionToProps = {
  setNavbar,
};

export default connect(
  null,
  mapActionToProps
)(({ text, moreActive, click, link = "/", setNavbar }) => {
  const arrowClassnames = classnames(
    "sidebar__arrow",
    moreActive && "sidebar__arrow--active"
  );
  return (
    <NavLink
      onClick={click ? () => click() : () => setNavbar()}
      className="sidebar__element"
      to={link}
    >
      {text} {text === "More" && <span className={arrowClassnames}>&#62;</span>}
    </NavLink>
  );
});
