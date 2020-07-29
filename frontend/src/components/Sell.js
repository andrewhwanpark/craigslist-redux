import React from "react";
import { Container, Form, Button, Row, Col, InputGroup } from "react-bootstrap";

export default function Sell() {
  return (
    <Container fluid>
      <Row>
        <Col lg={10}>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="the more detail the better!"
                />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" placeholder="250" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Zipcode</Form.Label>
                  <Form.Control type="number" placeholder="10012" />
                </Form.Group>
              </Form.Row>
            </Form.Row>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="4"
                placeholder="Retail price, Condition, Measurements, Shipping Policy, etc"
              />
            </Form.Group>

            <Form.Group controlId="formGridState">
              <Form.Label>Condition</Form.Label>
              <Form.Control as="select" defaultValue="Choose...">
                <option>Choose...</option>
                <option>New/Never Used</option>
                <option>Gently Used</option>
                <option>Used</option>
                <option>Heavily Used</option>
              </Form.Control>
            </Form.Group>

            <Button variant="dark" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
