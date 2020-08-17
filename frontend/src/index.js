import React from "react";
import ReactDOM from "react-dom";
import "./scss/App.scss";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ListingProvider } from "./context/Context";

ReactDOM.render(
  <ListingProvider>
    <Router>
      <App />
    </Router>
  </ListingProvider>,
  document.getElementById("root")
);
