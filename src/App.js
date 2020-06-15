import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import Navbars from "./components/Navbars";
import Footers from "./components/Footers";
import Home from "./components/Home";
import Default from "./components/Default";
import About from "./components/About";
import Sell from "./components/Sell";
import ListingDetail from "./components/ListingDetail"

function App() {
  return (
    <React.Fragment>
      <Navbars />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/sell" component={Sell} />
        <Route path="/detail/:title" component={ListingDetail} />
        <Route component={Default} />
      </Switch>
      <Footers />
    </React.Fragment>
  );
}

export default App;
