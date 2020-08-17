import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingSpinner = () => {
  return (
    <Spinner animation="border" role="status" variant="purple">
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

export default LoadingSpinner;
