import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import UserContext from "./context/UserContext";

export default function UserSettings() {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("No File Chosen");
  const [uploadedFile, setUploadedFile] = useState({});

  // Prevent editing when not logged in
  useEffect(() => {
    if (!userData.user) {
      history.push("/login");
    }
  }, [userData]);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post('http://localhost:5000/users/uploadImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const { fileName, filePath } = res.data;
      
      setUploadedFile({ fileName, filePath });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server")
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

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
                <Form.File
                  id="uploadAvatar"
                  label="Upload avatar"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    setFilename(e.target.files[0].name);
                  }}
                />
              </Form.Group>
            </Form.Row>

            <Button variant="dark" type="submit" onClick={onSubmit}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
