import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import ErrorMsg from "./ErrorMsg";
import LocationSelector from "../shared/LocationSelector";

const Signup = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [location, setLocation] = useState();

  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    const newUser = { username, email, password, passwordCheck, location };

    Axios.post("http://localhost:5000/users/register", newUser)
      .then((res) => {
        return Axios.post("http://localhost:5000/users/login", {
          email,
          password,
        });
      })
      .then((res) => {
        setUserData({ token: res.data.token, user: res.data.user });
        localStorage.setItem("auth-token", res.data.token);
        // Redirect to home
        history.push("/");
      })
      .catch((err) => {
        setError(err.response.data.msg);
      });
  };

  return (
    <Form className="centered-form" onSubmit={submit}>
      {error && (
        <ErrorMsg
          message={error}
          clearError={() => {
            setError(undefined);
          }}
        />
      )}
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group controlId="formVerifyPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPasswordCheck(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Location</Form.Label>
        <LocationSelector
          onChange={(e) => {
            setLocation(e.value);
          }}
        />
      </Form.Group>
      <Button variant="purple" type="submit" onClick={submit} block>
        Create Account
      </Button>
    </Form>
  );
};

export default Signup;
