import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "./context/UserContext";
import { Spinner } from "react-bootstrap";

const ProtectedRoute = ({ component }) => {
  const Component = component;
  const { userData } = useContext(UserContext);

  return userData.loading ? (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  ) : userData.user ? (
    <Component />
  ) : (
    <Redirect to={{ pathname: "/login" }} />
  );
};

export default ProtectedRoute;
