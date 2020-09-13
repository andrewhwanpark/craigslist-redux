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

  const submit = (e) => {
    e.preventDefault();

    const newUser = { username, email, password, passwordCheck, location };

    Axios.post("/api/users/register", newUser)
      .then(() => {
        return Axios.post("/api/users/login", {
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
      <svg
        width="2em"
        height="2em"
        viewBox="0 0 16 16"
        className="bi bi-peace d-block mb-2"
        style={{ margin: "auto", color: "#563d7c" }}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M7.5 1.018a7 7 0 0 0-4.79 11.566L7.5 7.793V1.018zm1 0v6.775l4.79 4.79A7 7 0 0 0 8.5 1.018zm4.084 12.273L8.5 9.207v5.775a6.97 6.97 0 0 0 4.084-1.691zM7.5 14.982V9.207l-4.084 4.084A6.97 6.97 0 0 0 7.5 14.982zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
        />
      </svg>
      <h3 className="text-center mb-4">Sign Up</h3>
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
          placeholder="Enter Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group controlId="formVerifyPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm Password"
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
