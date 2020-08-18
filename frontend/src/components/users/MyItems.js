import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const MyItems = () => {
  return (
    <Container fluid>
      <Row className="my-4">
        <Col lg={12}>
          <h2>My Items</h2>
        </Col>
      </Row>
    </Container>
  );
};

export default MyItems;
