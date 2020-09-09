import React from "react";
import moment from "moment";
import { Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import FavoritesToggle from "./FavoritesToggle";

const Listing = ({ title, date, price, image, id }) => {
  // If no images, use placeholder
  const src =
    image.length === 0
      ? "https://www.thedome.org/wp-content/uploads/2019/06/300x300-Placeholder-Image.jpg"
      : `/${image[0].filePath}`;

  return (
    <Col xl={2} lg={3} md={3} sm={4} xs={6} className="my-4 feed-item">
      <Link to={`/detail/${id}`} className="listing-link text-decoration-none">
        <div className="listing-cover-photo">
          <Image src={src} className="listing-img" alt={title} />
        </div>
        <p className="my-0">
          <small className="text-muted">{moment(date).fromNow()}</small>
        </p>
        <hr className="mt-0 mb-1" />
        <p className="my-0">{title}</p>
      </Link>
      <div>
        <p className="my-0" style={{ float: "left" }}>
          <strong>${price}</strong>
        </p>
        <FavoritesToggle id={id} size="1em" />
      </div>
    </Col>
  );
};

export default Listing;
