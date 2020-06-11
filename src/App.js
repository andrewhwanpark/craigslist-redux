import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import Navbars from "./components/Navbars";
import Footers from "./components/Footers";
import MainContent from "./components/MainContent";
import Default from "./components/Default";
import About from "./components/About";
import Sell from "./components/Sell";

function App() {
  return (
    <React.Fragment>
      <Navbars />
      <Switch>
        <Route exact path="/" component={MainContent} />
        <Route path="/about" component={About} />
        <Route path="/sell" component={Sell} />
        <Route component={Default} />
      </Switch>
      <Footers />
    </React.Fragment>
  );
}

export default App;
