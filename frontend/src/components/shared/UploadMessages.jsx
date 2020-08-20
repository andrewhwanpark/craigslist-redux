import React from "react";
import { Alert } from "react-bootstrap";

const UploadMessages = ({ msg, clearError }) => {
  return (
    <Alert variant="primary" onClose={clearError} dismissible>
      {msg}
    </Alert>
  );
};

export default UploadMessages;
