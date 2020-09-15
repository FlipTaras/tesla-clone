import React, { useEffect } from "react";
import MainPage from "./pages/MainPage";
import ModelS from "./pages/ModelS";
import { Switch, Route } from "react-router";
import Navbar from "./components/App/Navbar";
import { connect } from "react-redux";
import { setPageYOffSet } from "./static/store/actions";

const mapStateToProps = (state) => ({
  navbarActive: state.page.navbarActive,
});

const mapActionToProps = {
  setPageYOffSet,
};

function App({ navbarActive, setPageYOffSet }) {
  /* Detect windowYOffset */
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setPageYOffSet(window.pageYOffset);
    });
  }, [setPageYOffSet]);
  if (navbarActive) {
    document.querySelector("body").classList.add("overscroll-off");
  } else {
    document.querySelector("body").classList.remove("overscroll-off");
  }
  return (
    <div className="app">
      <Navbar />
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/model-s" component={ModelS} />
      </Switch>
    </div>
  );
}

export default connect(mapStateToProps, mapActionToProps)(App);
