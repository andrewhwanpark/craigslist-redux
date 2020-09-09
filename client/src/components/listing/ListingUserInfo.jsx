import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const ListingUserInfo = ({ writer }) => {
  return (
    <Link
      to={`/${writer.username}`}
      className="link-no-style text-decoration-none"
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
        <strong>
          {writer.username} ({writer.sold})
        </strong>
      </span>
      <br />
      <span>{writer.forSale} listings for sale</span>
    </Link>
  );
};

export default ListingUserInfo;
