import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import TeslaLogo from "../../static/images/Teslalogo.svg";
import TeslaLogoWhite from "../../static/images/TeslalogoWhite.svg";
import { Fade as Hamburger } from "hamburger-react";
import Sidebar from "./Sidebar";
import Backdrop from "./Backdrop";
import { connect } from "react-redux";
import classnames from "classnames";
import { setNavbar } from "../../static/store/actions";

const mapStateToProps = (state) => ({
  loaded: state.page.loaded,
  navbarActive: state.page.navbarActive,
});

const mapActionToProps = {
  setNavbar,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(
  withRouter(({ loaded, history, setNavbar, navbarActive }) => {
    const onMainPage = history.location.pathname === "/";

    const hamburgerClassNames = classnames(
      "navbar__hamburger",
      !onMainPage && "navbar__hamburger navbar__hamburger--light",
      navbarActive && "navbar__hamburger--active"
    );
    const navBarProducts = [
      {
        title: "Model S",
        link: "/model-s/",
      },
      {
        title: "Model 3",
        link: "/model-3/",
      },
      {
        title: "Model X",
        link: "/model-x/",
      },
      {
        title: "Model Y",
        link: "/model-y/",
      },
      {
        title: "Solar Roof",
        link: "/solar-roof/",
      },
      {
        title: "Solar Panels",
        link: "/solar-panels/",
      },
    ];

    return (
      <>
        <Backdrop />
        {loaded && (
          <nav className={onMainPage ? "navbar" : "navbar navbar--light"}>
            <Sidebar />
            <div className="navbar__left">
              <NavLink to="/">
                <img
                  className="navbar__logo"
                  // src={onMainPage ? TeslaLogo : TeslaLogoWhite}
                  src={TeslaLogo}
                  alt="logo"
                />
              </NavLink>
            </div>
            <ul className="navbar__list">
              {navBarProducts.map((el) => (
                <li key={el.title} className="navbar__element">
                  <NavLink
                    className={
                      onMainPage
                        ? "navbar__link"
                        : "navbar__link navbar__link--light"
                    }
                    to={`${el.link}`}
                  >
                    {el.title}
                  </NavLink>
                </li>
              ))}
              <div className="navbar__right">
                <li className="navbar__element">
                  <NavLink
                    className={
                      onMainPage
                        ? "navbar__link"
                        : "navbar__link navbar__link--light"
                    }
                    to="/shop"
                  >
                    Shop
                  </NavLink>
                </li>
                <li className="navbar__element">
                  <NavLink
                    className={
                      onMainPage
                        ? "navbar__link"
                        : "navbar__link navbar__link--light"
                    }
                    to="/signin"
                  >
                    sign in
                  </NavLink>
                </li>
              </div>
              <div className={hamburgerClassNames}>
                <Hamburger
                  toggled={navbarActive}
                  toggle={setNavbar}
                  size={20}
                  direction="right"
                />
              </div>
            </ul>
          </nav>
        )}
      </>
    );
  })
);
