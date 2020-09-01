import React from "react";
import MainPage from "./pages/MainPage";
import Model3 from "./pages/Model3";
import { Switch, Route } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  // document.body.addEventListener("touchmove", function (e) {
  //   e.preventDefault();
  // });
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty("--height", `${vh}px`);
  return (
    <div className="app">
      <Navbar />
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/model3" component={Model3} />
      </Switch>
      {/* <Footer active /> */}
    </div>
  );
}

export default App;
