import React, { useState } from "react";
import { Alert } from "react-bootstrap";

export default function ErrorMsg(props) {
  return (
    <Alert variant="danger" onClose={props.clearError} dismissible>
      {props.message}
    </Alert>
  );
}
