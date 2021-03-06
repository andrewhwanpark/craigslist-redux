import React, { useState, useEffect, useMemo } from "react";
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
import ProtectedRoute from "./routes/ProtectedRoute";
import AuthCheckRoute from "./routes/AuthCheckRoute";
import UserContext from "./context/UserContext";
import MyItems from "./components/users/MyItems";
import Favorites from "./components/users/Favorites";
import Seller from "./components/users/Seller";
import EditListing from "./components/listing/EditListing";
import AlertMsg from "./components/shared/AlertMsg";
import Messages from "./components/messaging/Messages";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
    loading: true,
  });

  const [globalMsg, setGlobalMsg] = useState({
    message: undefined,
    variant: undefined,
  });

  const providerValue = useMemo(
    () => ({ userData, setUserData, globalMsg, setGlobalMsg }),
    [userData, globalMsg]
  );

  useEffect(() => {
    const checkLoggedIn = () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      Axios.post("/api/users/token-is-valid", null, {
        headers: { "x-auth-token": token },
      })
        .then((res) => {
          if (res.data) {
            Axios.get("/api/users/", {
              headers: { "x-auth-token": token },
            })
              .then((userRes) => {
                setUserData({
                  token,
                  user: userRes.data,
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
    <>
      <UserContext.Provider value={providerValue}>
        <Navbars />
        {globalMsg.message ? (
          <AlertMsg
            variant={globalMsg.variant}
            msg={globalMsg.message}
            clearError={() => {
              setGlobalMsg({ message: undefined, variant: undefined });
            }}
          />
        ) : null}
        <Switch>
          <AuthCheckRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/about" component={About} />
          <ProtectedRoute exact path="/sell" component={Sell} />
          <ProtectedRoute exact path="/messages" component={Messages} />
          <Route exact path="/:username" component={Seller} />
          <AuthCheckRoute exact path="/detail/:id" component={ListingDetail} />
          <ProtectedRoute
            exact
            path="/detail/:id/edit"
            component={EditListing}
          />
          <ProtectedRoute
            exact
            path="/users/settings"
            component={UserSettings}
          />
          <ProtectedRoute exact path="/users/myitems" component={MyItems} />
          <ProtectedRoute exact path="/users/favorites" component={Favorites} />
          <Route component={Default} />
        </Switch>
        <Footers />
      </UserContext.Provider>
    </>
  );
}

export default App;
