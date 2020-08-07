import React, { useContext, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import UserContext from "../../context/UserContext";
import Dropzone from "./Dropzone";

export default function Sell() {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  // Prevent selling when not logged in
  useEffect(() => {
    if (!userData.user) {
      history.push("/login");
    }
  }, [userData]);

  return (
    <Container fluid>
      <Row className="my-4">
        <Col lg={12}>
          <h2>Add a listing</h2>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="the more detail the better!"
                />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="formPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" placeholder="250" />
                </Form.Group>
                <Form.Group as={Col} controlId="formZipcode">
                  <Form.Label>Zipcode</Form.Label>
                  <Form.Control type="number" placeholder="10012" />
                </Form.Group>
              </Form.Row>
            </Form.Row>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="4"
                placeholder="Retail price, Condition, Measurements, Shipping Policy, etc"
              />
            </Form.Group>

            <Form.Group controlId="formCondition">
              <Form.Label>Condition</Form.Label>
              <Form.Control as="select" defaultValue="Choose...">
                <option>Choose...</option>
                <option>New/Never Used</option>
                <option>Gently Used</option>
                <option>Used</option>
                <option>Heavily Used</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formImages">
              <Form.Label>Images</Form.Label>
              <Dropzone />
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
