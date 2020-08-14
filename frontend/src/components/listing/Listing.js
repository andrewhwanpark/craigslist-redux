import React, { useContext, useEffect } from "react";
import { Col, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Listing = ({ title, date, desc, price, image, location, cuid }) => {
  // If no images, use placeholder
  let src;
  image.length === 0
    ? (src =
        "https://www.thedome.org/wp-content/uploads/2019/06/300x300-Placeholder-Image.jpg")
    : (src = `http://localhost:5000/${image[0].filePath}`);

  return (
    <Col lg={3} md={6} xs={6} className="my-4">
      <Card>
        <Card.Img variant="top" src={src} />
        <Card.Body>
          <Link to={"/detail/" + cuid}>
            <Card.Title>
              {title} <Badge variant="secondary">${price}</Badge>
            </Card.Title>
          </Link>
          <Card.Text>{date}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Listing;
