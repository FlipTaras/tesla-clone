import React, { useEffect } from "react";
import MainPage from "./pages/MainPage";
import ModelS from "./pages/ModelS";
import { Switch, Route } from "react-router";
import { connect } from "react-redux";
import { setPageYOffSet, setWidth, setHeight } from "./static/store/actions";

const mapStateToProps = (state) => ({
  navbarActive: state.page.navbarActive,
});

const mapActionToProps = {
  setPageYOffSet,
  setWidth,
  setHeight,
};

function App({ navbarActive, setPageYOffSet, setWidth, setHeight }) {
  /* Detect windowYOffset */
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setPageYOffSet(window.pageYOffset);
    });
  }, [setPageYOffSet]);

  /* Detect width and height change */
  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--height", `${vh}px`);
    window.addEventListener("resize", () => {
      vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--height", `${vh}px`);
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      /* Small fix when resize while learn more section is open */
      document.querySelector("body").style.overflow = "";
      document.querySelector("html").style.overflow = "";
    });
  }, [setWidth, setHeight]);

  /* Scrolling offf when side bar On */
  if (navbarActive) {
    document.querySelector("body").classList.add("overscroll-off");
  } else {
    document.querySelector("body").classList.remove("overscroll-off");
  }

  return (
    <div className="app">
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/model-s" component={ModelS} />
      </Switch>
    </div>
  );
}

export default connect(mapStateToProps, mapActionToProps)(App);
