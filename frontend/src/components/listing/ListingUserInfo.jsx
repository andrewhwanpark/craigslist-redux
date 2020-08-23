import React from "react";
import { Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const ListingUserInfo = ({ writer }) => {
  return (
    <Container fluid>
      <Image
        src={`http://localhost:5000/${writer.image.filePath}`}
        roundedCircle
        width="50"
        height="50"
        className="mr-2"
        style={{ float: "left" }}
      />
      <Link to={`/${writer.username}`}>
        <span>
          {writer.username} ({writer.sold})
        </span>
      </Link>
      <br />
      <span>0 listings for sale</span>
    </Container>
  );
};

export default ListingUserInfo;
