import React from "react";
import { Alert } from "react-bootstrap";

export default function ErrorMsg({ clearError, message }) {
  return (
    <Alert variant="danger" onClose={clearError} dismissible>
      {message}
    </Alert>
  );
}
