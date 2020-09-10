import React from "react";
import MainPage from "./pages/MainPage";
import ModelS from "./pages/ModelS";
import { Switch, Route } from "react-router";
import Navbar from "./components/App/Navbar";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  navbarActive: state.page.navbarActive,
});

function App({ navbarActive }) {
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

export default connect(mapStateToProps)(App);
