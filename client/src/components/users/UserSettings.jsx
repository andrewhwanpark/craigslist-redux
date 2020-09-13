import React, { useState, useContext } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import bsCustomFileInput from "bs-custom-file-input";
import UserContext from "../../context/UserContext";
import Progress from "./Progress";
import LocationSelector from "../shared/LocationSelector";
import ProfileCard from "./ProfileCard";
import DeleteModal from "../shared/DeleteModal";
import AlertMsg from "../shared/AlertMsg";
import { isDefined, isNullable } from "../../utils/null-checks";

const UserSettings = () => {
  bsCustomFileInput.init();
  const { userData, setUserData, setGlobalMsg } = useContext(UserContext);
  const history = useHistory();

  const [file, setFile] = useState();
  const [message, setMessage] = useState({
    message: undefined,
    variant: undefined,
  });
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [username, setUsername] = useState(userData.user.username);
  const [email, setEmail] = useState(userData.user.email);
  const [location, setLocation] = useState(userData.user.location);

  const [modalShow, setModalShow] = useState(false);

  const onChangeInfoSubmit = (e) => {
    e.preventDefault();

    // Check blank fields
    if (
      isNullable(username) ||
      isNullable(email) ||
      username.length === 0 ||
      email.length === 0
    ) {
      setMessage({ message: "Please enter all fields", variant: "danger" });
      return;
    }

    // Check if nothing changed
    if (
      username === userData.user.username &&
      email === userData.user.email &&
      location === userData.user.location
    ) {
      setMessage({
        message: "No change detected. Did you enter new information?",
        variant: "danger",
      });
      return;
    }

    const newInfo = {
      username,
      email,
      location,
    };

    Axios.post("/api/users/change-info", newInfo, {
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
      },
    })
      .then(() => {
        setMessage({ message: "Information updated!", variant: "success" });
      })
      .catch((err) => {
        if (isDefined(err.response.data.msg)) {
          setMessage({ message: err.response.data.msg, variant: "danger" });
        } else {
          setMessage({
            message: "Server Error: please try again",
            variant: "danger",
          });
        }
      });
  };

  // Handler for profile picture
  const onSubmit = (e) => {
    e.preventDefault();

    // Handle no file
    if (isNullable(file)) {
      setMessage({ message: "No file was uploaded.", variant: "danger" });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    Axios.post("/api/users/upload-image", formData, {
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
        setMessage({
          message: "Image successfully uploaded! Refresh to see changes.",
          variant: "success",
        });
      })
      .catch((err) => {
        setMessage({
          message: "Server Error: Failed to upload",
          variant: "success",
        });
        console.error(err);
      });
  };

  const deleteAccount = () => {
    Axios.delete("/api/users/delete", {
      headers: { "x-auth-token": localStorage.getItem("auth-token") },
    })
      .then(() => {
        // Logout user
        setUserData({
          token: undefined,
          user: undefined,
        });
        localStorage.setItem("auth-token", "");
        // Back to home page
        history.push("/");
        setGlobalMsg({ message: "Account deleted!", variant: "success" });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Container fluid>
      <ProfileCard writer={userData.user} hideEditButton />

      <Row className="my-4">
        <Col lg={12}>
          <h2>Edit Your Info</h2>
          {message.message ? (
            <AlertMsg
              msg={message.message}
              variant={message.variant}
              clearError={() => {
                setMessage({ message: undefined, variant: undefined });
              }}
            />
          ) : null}
          <Form onSubmit={onChangeInfoSubmit}>
            <Form.Row>
              <Form.Group
                as={Col}
                xs="12"
                sm="6"
                md="6"
                lg="6"
                xl="6"
                controlId="changeUsername"
              >
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group
                as={Col}
                xs="12"
                sm="6"
                md="6"
                lg="6"
                xl="6"
                controlId="changeEmail"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  value={email}
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
                    setLocation(e.value);
                  }}
                  defaultValue={location}
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
            <Button variant="purple" type="submit">
              Submit
            </Button>
          </Form>
          <br />
          <Button
            variant="danger"
            className="float-right"
            onClick={() => setModalShow(true)}
          >
            Delete Account
          </Button>

          <DeleteModal
            name="My Account"
            show={modalShow}
            onHide={() => setModalShow(false)}
            deleteFunc={deleteAccount}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default UserSettings;
