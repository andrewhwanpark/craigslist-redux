import React from "react";
import { Form, Button } from "react-bootstrap";

const Login = () => {
  return (
    <Form className="form-signin">
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          Experimental site: do not enter sensitive password
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="dark" type="submit" block>
        Log In
      </Button>
    </Form>
  );
};

export default Login;
