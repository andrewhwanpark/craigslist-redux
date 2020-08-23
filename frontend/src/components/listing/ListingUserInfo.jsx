import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const ListingUserInfo = ({ writer }) => {
  return (
    <>
      <Link
        to={`/${writer.username}`}
        className="link-no-style text-decoration-none font-weight-bold"
      >
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
      </Link>
      <br />
      <span>0 listings for sale</span>
    </>
  );
};

export default ListingUserInfo;
