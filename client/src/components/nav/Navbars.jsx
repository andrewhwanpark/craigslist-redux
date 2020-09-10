import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import UserContext from "../../context/UserContext";
import Avatar from "./Avatar";

const Navbars = () => {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/");
  };

  return (
    <header>
      <Navbar bg="purple" variant="dark">
        <Navbar.Brand as={Link} to="/">
          <svg
            width="1.75em"
            height="1.75em"
            viewBox="0 0 16 16"
            className="bi bi-peace"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.5 1.018a7 7 0 0 0-4.79 11.566L7.5 7.793V1.018zm1 0v6.775l4.79 4.79A7 7 0 0 0 8.5 1.018zm4.084 12.273L8.5 9.207v5.775a6.97 6.97 0 0 0 4.084-1.691zM7.5 14.982V9.207l-4.084 4.084A6.97 6.97 0 0 0 7.5 14.982zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
            />
          </svg>
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
          <Nav.Link as={Link} to="/sell">
            Sell
          </Nav.Link>
          <Nav.Link as={Link} to="/users/favorites">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-suit-heart-fill"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
            </svg>
          </Nav.Link>
        </Nav>
        <Nav>
          {userData.user ? (
            <Avatar logout={logout} />
          ) : (
            <>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Sign Up
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar>
    </header>
  );
};

export default Navbars;
