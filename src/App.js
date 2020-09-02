import React from "react";
import MainPage from "./pages/MainPage";
import Model3 from "./pages/Model3";
import { Switch, Route } from "react-router";
import Navbar from "./components/Navbar";
import { connect } from "react-redux";
import { setLoaded } from "./static/store/actions";

const mapActionToProps = {
  setLoaded,
};

function App({ setLoaded }) {
  /* Wait till page load, to load content */
  window.addEventListener("load", () => setLoaded());

  return (
    <div className="app">
      <Navbar />
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/model3" component={Model3} />
      </Switch>
    </div>
  );
}

export default connect(null, mapActionToProps)(App);
