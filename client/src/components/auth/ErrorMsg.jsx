import React from "react";
import { Alert } from "react-bootstrap";

const ErrorMsg = ({ clearError, message }) => {
  return (
    <Alert variant="danger" onClose={clearError} dismissible>
      {message}
    </Alert>
  );
};

export default ErrorMsg;
