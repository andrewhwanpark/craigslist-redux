import React from "react";
import { Col, Card, Badge } from "react-bootstrap";
import placeholder from "../placeholder.png";

function Listing({ title, price, date, image, desc }) {
    // If no image src, then replace with placeholder
    let src;
    image == "null" ? src = placeholder : src = image

    return (
        <Col lg={3} md={6} xs={6} className="my-4">
        <Card>
            <Card.Img variant="top" src={src} />
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
