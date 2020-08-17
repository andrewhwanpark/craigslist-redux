import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "./context/UserContext";
import LoadingSpinner from "./components/shared/LoadingSpinner";

const ProtectedRoute = ({ component }) => {
  const Component = component;
  const { userData } = useContext(UserContext);

  return userData.loading ? (
    <LoadingSpinner />
  ) : userData.user ? (
    <Component />
  ) : (
    <Redirect to={{ pathname: "/login" }} />
  );
};

export default ProtectedRoute;
