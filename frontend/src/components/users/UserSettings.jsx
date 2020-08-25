import React, { useState, useContext } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Axios from "axios";
import bsCustomFileInput from "bs-custom-file-input";
import UserContext from "../../context/UserContext";
import UploadMessages from "../shared/UploadMessages";
import Progress from "./Progress";
import { isNullable } from "../../utils/null-checks";
import LocationSelector from "../shared/LocationSelector";
import ProfileCard from "./ProfileCard";

const UserSettings = () => {
  bsCustomFileInput.init();
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
      username,
      email,
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
            Math.round((progressEvent.loaded * 100) / progressEvent.total),
            10
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
      <ProfileCard writer={userData.user} hideEditButton />

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
                <LocationSelector
                  isClearable={false}
                  onChange={(e) => {
                    setRegion(e.value);
                  }}
                  defaultValue={userData.user.location}
                  className="z-index-fix"
                />
              </Form.Group>
            </Form.Row>
            <Button variant="purple" type="submit" onClick={onChangeInfoSubmit}>
              Submit
            </Button>{" "}
          </Form>
          <br />
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>Upload Profile Picture</Form.Label>
              <Form.File
                id="uploadProfilePicture"
                label="Only .png, .jpeg files accepted"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
                custom
              />
            </Form.Group>
            <Progress percentage={uploadPercentage} />
            <br />
            <Button variant="purple" type="submit" onClick={onSubmit}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserSettings;
