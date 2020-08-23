/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import UserContext from "../context/UserContext";
import LoadingSpinner from "../components/shared/LoadingSpinner";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { userData } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        userData.loading ? (
          <LoadingSpinner className="centered-on-page-spinner" />
        ) : userData.user ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
};

export default ProtectedRoute;
