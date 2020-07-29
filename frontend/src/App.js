import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Axios from "axios";

import Navbars from "./components/nav/Navbars";
import Footers from "./components/Footers";
import Home from "./components/Home";
import Default from "./components/Default";
import About from "./components/About";
import Sell from "./components/Sell";
import ListingDetail from "./components/listing/ListingDetail";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

import UserContext from "./context/UserContext";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );

      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });

        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <React.Fragment>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Navbars />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/sell" component={Sell} />
          <Route path="/detail/:title" component={ListingDetail} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route component={Default} />
        </Switch>
        <Footers />
      </UserContext.Provider>
    </React.Fragment>
  );
}

export default App;
