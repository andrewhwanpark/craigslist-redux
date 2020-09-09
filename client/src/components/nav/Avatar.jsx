import React, { useContext } from "react";
import { Image, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Avatar = ({ logout }) => {
  const { userData } = useContext(UserContext);

  return (
    <NavDropdown
      title={
        <Image
          src={userData.loading ? null : `/${userData.user.image.filePath}`}
          width="40"
          height="40"
          roundedCircle
        />
      }
      alignRight
      id="nav-dropdown-align-right"
    >
      <NavDropdown.Item href="/messages">Messages</NavDropdown.Item>
      <NavDropdown.Item href="/users/favorites">Favorites</NavDropdown.Item>
      <NavDropdown.Item href="/users/myitems">My Items</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/users/settings">
        Settings
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
    </NavDropdown>
  );
};

export default Avatar;
