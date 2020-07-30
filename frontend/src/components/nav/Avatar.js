import React from "react";
import { Image, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Avatar(props) {
  return (
    <NavDropdown
      title={
        <Image
          src="https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
          width="40"
          height="40"
          roundedCircle
        />
      }
      alignRight
      id="nav-dropdown-align-right"
    >
      <NavDropdown.Item href="#action/3.1">Messages</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.2">Favorites</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.3">My Items</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/users/settings">
        Settings
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={props.logout}>Logout</NavDropdown.Item>
    </NavDropdown>
  );
}
