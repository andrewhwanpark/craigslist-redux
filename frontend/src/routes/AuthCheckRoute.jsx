/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from "react";
import { Route } from "react-router-dom";
import UserContext from "../context/UserContext";
import LoadingSpinner from "../components/shared/LoadingSpinner";

// Doesn't require login, but polls to ensure that component loads after userData loads
const AuthCheckRoute = ({ component: Component, ...rest }) => {
  const { userData } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        userData.loading ? (
          <LoadingSpinner className="centered-on-page-spinner" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default AuthCheckRoute;
