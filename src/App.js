import React from "react";
import MainPage from "./pages/MainPage";
import ModelS from "./pages/ModelS";
import { Switch, Route } from "react-router";
import Navbar from "./components/App/Navbar";

function App() {
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

export default App;
