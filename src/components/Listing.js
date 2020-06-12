import React from "react";
import { Col, Card, Badge } from "react-bootstrap";
import placeholder from "../placeholder.png";

function Listing({ title, price, date, image, desc }) {
  return (
    <Col lg={3} md={6} xs={6} className="my-4">
      <Card>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>
            {title} <Badge variant="secondary">${price}</Badge>
          </Card.Title>
          <Card.Text>{date}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Listing;
