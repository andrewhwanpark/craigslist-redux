import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Axios from "axios";

import Navbars from "./components/nav/Navbars";
import Footers from "./components/Footers";
import Home from "./components/Home";
import Default from "./components/Default";
import About from "./components/About";
import Sell from "./components/sell/Sell";
import ListingDetail from "./components/listing/ListingDetail";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import UserSettings from "./components/users/UserSettings";
import ProtectedRoute from "./ProtectedRoute";
import UserContext from "./context/UserContext";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
    loading: true,
  });

  // const [listingDetail, setListingDetail] = useState({});

  // // Helper to find appropriate listing to set as detail
  // const getListingDetail = (cuid) => {
  //   const listing = listingData.listings.find((item) => item.cuid === cuid);
  //   setListingDetail(listing);
  // };

  const providerValue = useMemo(() => ({ userData, setUserData }), [userData]);

  useEffect(() => {
    const checkLoggedIn = () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      Axios.post("http://localhost:5000/users/tokenIsValid", null, {
        headers: { "x-auth-token": token },
      })
        .then((res) => {
          if (res.data) {
            Axios.get("http://localhost:5000/users/", {
              headers: { "x-auth-token": token },
            })
              .then((res) => {
                setUserData({
                  token,
                  user: res.data,
                  loading: false,
                });
              })
              .catch((err) => {
                console.error(err);
              });
          } else {
            setUserData({ loading: false });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    };

    checkLoggedIn();
  }, []);

  return (
    <React.Fragment>
      <UserContext.Provider value={providerValue}>
        <Navbars />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <ProtectedRoute path="/sell" component={Sell} />
          <Route path="/detail/:cuid" component={ListingDetail} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <ProtectedRoute path="/users/settings" component={UserSettings} />
          <Route component={Default} />
        </Switch>
        <Footers />
      </UserContext.Provider>
    </React.Fragment>
  );
}

export default App;
