import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import LoadingSpinner from "../components/shared/LoadingSpinner";

// Doesn't require login, but polls to ensure that component loads after userData loads
const AuthCheckRoute = ({ component }) => {
  const Component = component;
  const { userData } = useContext(UserContext);

  return userData.loading ? (
    <LoadingSpinner className="centered-on-page-spinner" />
  ) : (
    <Component />
  );
};

export default AuthCheckRoute;
