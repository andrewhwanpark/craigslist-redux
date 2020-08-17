import React, { useContext } from "react";
import { Image, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Avatar = (props) => {
  const { userData } = useContext(UserContext);

  return (
    <NavDropdown
      title={
        <Image
          src={
            userData.loading
              ? null
              : userData.user.image.filePath
              ? `http://localhost:5000/${userData.user.image.filePath}`
              : "https://crossfithvl.com/wp-content/uploads/2016/09/profile-placeholder-copy-2.png"
          }
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
};

export default Avatar;
