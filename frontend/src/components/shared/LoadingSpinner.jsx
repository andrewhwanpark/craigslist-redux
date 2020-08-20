import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingSpinner = ({ className }) => {
  return (
    <Spinner
      animation="border"
      role="status"
      variant="purple"
      className={className}
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

export default LoadingSpinner;
