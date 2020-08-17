import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Image } from "react-bootstrap";
import UserContext from "../../context/UserContext";
import LoadingSpinner from "../shared/LoadingSpinner";

const ListingUserInfo = () => {
  const { userData } = useContext(UserContext);

  return userData.loading ? (
    <LoadingSpinner />
  ) : (
    <Container fluid>
      <Image
        src={
          userData.user.image.filePath
            ? `http://localhost:5000/${userData.user.image.filePath}`
            : "https://crossfithvl.com/wp-content/uploads/2016/09/profile-placeholder-copy-2.png"
        }
        roundedCircle
        width="50"
        height="50"
        className="mr-2"
        style={{ float: "left" }}
      />
      <span>{userData.user.username}</span>
      <br />
      <span>0 listings for sale</span>
    </Container>
  );
};

export default ListingUserInfo;
