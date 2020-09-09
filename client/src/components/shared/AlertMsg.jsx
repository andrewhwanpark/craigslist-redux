import React from "react";
import { Alert } from "react-bootstrap";

const AlertMsg = ({ msg, variant, clearError }) => {
  return (
    <Alert variant={variant} onClose={clearError} dismissible>
      {msg}
    </Alert>
  );
};

export default AlertMsg;
