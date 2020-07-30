import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

// Import Bootstrap styles
import { Navbar, Nav } from "react-bootstrap";
import UserLocation from "./UserLocation";
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
      <Navbar bg="light" variant="light">
        <Navbar.Brand as={Link} to="/">
          craigslist redux
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
          <Nav.Link as={Link} to="/sell">
            Sell
          </Nav.Link>
          <UserLocation />
        </Nav>
        <Nav>
          {userData.user ? (
            <Avatar logout={logout} />
          ) : (
            <React.Fragment>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Sign Up
              </Nav.Link>
            </React.Fragment>
          )}
        </Nav>
      </Navbar>
    </header>
  );
};

export default Navbars;
