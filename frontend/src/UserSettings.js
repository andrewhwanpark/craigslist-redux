import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import UserContext from "./context/UserContext";

export default function UserSettings() {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  // Prevent editing when not logged in
  useEffect(() => {
    if (!userData.user) {
      history.push("/login");
    }
  }, [userData]);

  console.log(userData.user);

  return (
    <Container fluid>
      <Row className="my-4">
        <Col lg={12}>
          <h2>Edit Your Info</h2>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="changeUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={userData.user.username}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="changeEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" placeholder="example@example.com" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group>
                <Form.File id="uploadAvatar" label="Upload avatar" />
              </Form.Group>
            </Form.Row>

            <Button variant="dark" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
