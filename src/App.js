import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Navbars from "./components/Navbars"
import Footers from "./components/Footers"
import MainContent from "./components/MainContent"

function App() {
  return (
    <>
      <Navbars />
      <MainContent />
      <Footers />
    </>
    
  );
}

export default App;
