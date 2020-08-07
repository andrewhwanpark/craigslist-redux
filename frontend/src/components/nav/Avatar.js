import React, { useEffect, useState } from "react";
import { Image, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";

export default function Avatar(props) {
  const [avatar, setAvatar] = useState(null);

  // Fetch avatar image of user
  useEffect(() => {
    const loadAvatar = async () => {
      try {
        const res = await Axios.get("http://localhost:5000/users/", {
          headers: {
            "x-auth-token": localStorage.getItem("auth-token"),
          },
        });

        setAvatar(res.data.image.filePath);
      } catch (err) {
        console.error(err);
      }
    };
    loadAvatar();
  }, []);

  return (
    <NavDropdown
      title={
        <Image
          src={
            avatar
              ? `http://localhost:5000/${avatar}`
              : "https://lh3.googleusercontent.com/proxy/2vbgYpLEkXTAHAt6colzh4NK7WpRWyGWYZBh2wkAvzpw1jCg4esAqJFQJyW028_3KP-8jIz3_Wh-DuljT9zszLgdNcyZW5IdMmSSWT25GSMlxa286Vx98qbfTtRcYmY1KiL113XaWoQ"
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
}
