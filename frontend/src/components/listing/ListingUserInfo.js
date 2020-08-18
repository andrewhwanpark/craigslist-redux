import React from "react";
import { Link } from "react-router-dom";
import { Container, Image } from "react-bootstrap";

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
      <span>
        {writer.username} ({writer.sold})
      </span>
      <br />
      <span>0 listings for sale</span>
    </Container>
  );
};

export default ListingUserInfo;
