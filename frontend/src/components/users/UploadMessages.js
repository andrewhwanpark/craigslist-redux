import React, { useState } from "react";
import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";

const UploadMessages = ({ msg, clearError }) => {
  return (
    <Alert variant="primary" onClose={clearError} dismissible>
      {msg}
    </Alert>
  );
};

UploadMessages.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default UploadMessages;
