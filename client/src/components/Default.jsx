import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// 404 Page
function Default() {
  return (
    <div className="centered-form">
      <h3 className="mb-4">404 Error</h3>
      <Link to="/">
        <Button variant="purple">Back to home</Button>
      </Link>
    </div>
  );
}

export default Default;
