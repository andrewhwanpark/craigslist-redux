import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";
import LoadingSpinner from "../components/shared/LoadingSpinner";

const ProtectedRoute = ({ component }) => {
  const Component = component;
  const { userData } = useContext(UserContext);

  if (userData.loading) {
    return <LoadingSpinner className="centered-on-page-spinner" />;
  }

  if (userData.user) {
    return <Component />;
  }

  return <Redirect to={{ pathname: "/login" }} />;
};

export default ProtectedRoute;
