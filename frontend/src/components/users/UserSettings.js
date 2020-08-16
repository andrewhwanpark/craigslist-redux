import React, { useState, useContext } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Axios from "axios";
import Select from "react-select";
import UserContext from "../../context/UserContext";
import UploadMessages from "../shared/UploadMessages";
import Progress from "./Progress";
import { cities } from "../../cities";
import { isNullable } from "../../utils/null-checks";

const UserSettings = () => {
  const { userData } = useContext(UserContext);

  const [file, setFile] = useState();
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [region, setRegion] = useState();

  // Handler for information change
  // TODO: Need to write location into register data in order to update
  // TODO: email validation
  const onChangeInfoSubmit = (e) => {
    e.preventDefault();

    if (isNullable(email)) {
      setMessage();
    }

    const newInfo = {
      username: username,
      email: email,
      location: region,
    };

    Axios.post("http://localhost:5000/users/changeInfo", newInfo, {
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
      },
    })
      .then(() => {
        setMessage("Information updated!");
      })
      .catch((err) => {
        setMessage("Server Error: Failed to send");
        console.error(err);
      });
  };

  // Handler for profile picture
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    Axios.post("http://localhost:5000/users/uploadImage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-auth-token": localStorage.getItem("auth-token"),
      },
      onUploadProgress: (progressEvent) => {
        setUploadPercentage(
          parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          )
        );

        // Clear percentage
        setTimeout(() => setUploadPercentage(0), 10000);
      },
    })
      .then(() => {
        setMessage("Image successfully uploaded! Refresh to see changes.");
      })
      .catch((err) => {
        setMessage("Server Error: Failed to upload");
        console.error(err);
      });
  };

  return (
    <Container fluid>
      <Row className="my-4">
        <Col lg={12}>
          <h2>Edit Your Info</h2>
          {message ? (
            <UploadMessages
              msg={message}
              clearError={() => {
                setMessage(undefined);
              }}
            />
          ) : null}
          <Form onSubmit={onChangeInfoSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="changeUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={userData.user.username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="changeEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="example@example.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="changeLocation">
                <Form.Label>Location</Form.Label>
                <Select
                  isSearchable
                  placeholder="Search for your city"
                  onChange={(e) => {
                    setRegion(e.value);
                  }}
                  options={cities}
                />
              </Form.Group>
            </Form.Row>

            <Button variant="dark" type="submit" onClick={onChangeInfoSubmit}>
              Submit
            </Button>
          </Form>

          <Form onSubmit={onSubmit}>
            <Form.Row>
              <Form.Group>
                <Form.File
                  id="uploadProfilePicture"
                  label="Upload Profile Picture"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
              </Form.Group>
            </Form.Row>
            <Progress percentage={uploadPercentage} />

            <Button variant="dark" type="submit" onClick={onSubmit}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserSettings;
