import React from "react";
import moment from "moment";
import { Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const Listing = ({ title, date, price, image, cuid }) => {
  // If no images, use placeholder
  const src =
    image.length === 0
      ? "https://www.thedome.org/wp-content/uploads/2019/06/300x300-Placeholder-Image.jpg"
      : `http://localhost:5000/${image[0].filePath}`;

  return (
    <Col xl={2} lg={3} md={3} sm={4} xs={6} className="my-4 feed-item">
      <Link
        to={`/detail/${cuid}`}
        className="listing-link text-decoration-none"
      >
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
        <button
          className="btn bg-transparent shadow-none py-0"
          style={{ float: "right" }}
          type="button"
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-heart"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
            />
          </svg>
        </button>
      </div>
    </Col>
  );
};

export default Listing;
