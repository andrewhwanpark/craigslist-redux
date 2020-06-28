import React, { useContext } from "react";
import { Col, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ListingContext } from "../Context";
import placeholder from "../placeholder.png";

function Listing({ title, price, date, thumbnail, id }) {
  const { contextHandleDetail } = useContext(ListingContext);
  const handleDetail = contextHandleDetail;
  // If no image src, then replace with placeholder
  let src;
  thumbnail === "null" ? (src = placeholder) : (src = thumbnail);

  return (
    <Col lg={3} md={6} xs={6} className="my-4">
      <Card>
        <Card.Img variant="top" src={src} />
        <Card.Body>
          <Link to={"/detail/" + encodeURI(title)} onClick={() => handleDetail(id)}>
            <Card.Title>
              {title} <Badge variant="secondary">${price}</Badge>
            </Card.Title>
          </Link>
          <Card.Text>{date}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Listing;
