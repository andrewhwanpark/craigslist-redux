import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ListingProvider } from "./context/Context";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <ListingProvider>
    <Router>
      <App />
    </Router>
  </ListingProvider>,
  document.getElementById("root")
);
