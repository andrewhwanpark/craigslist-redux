import React, { useState, useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Axios from "axios";
import cuid from "cuid";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Select from "react-select";
import update from "immutability-helper";
import UserContext from "../../context/UserContext";
import ListingImageUpload from "./ListingImageUpload";
import ImageList from "./ImageList";
import UploadMessages from "../shared/UploadMessages";
import { cities } from "../../cities";
import { isNullable } from "../../utils/null-checks";

const Sell = () => {
  // Context
  const { userData } = useContext(UserContext);
  // Router history hook
  const history = useHistory();
  // States
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [location, setLocation] = useState();
  const [desc, setDesc] = useState("");
  const [condition, setCondition] = useState();
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  // Error message
  const [message, setMessage] = useState("");
  // Max number of images to be uploaded
  const MAXFILES = 6;
  // Counter to track # of images
  let imgCount = 0;

  const moveImage = (dragIndex, hoverIndex) => {
    // Get the dragged element
    const draggedImage = images[dragIndex];
    const draggedFile = files[dragIndex];
    /*
      - copy the dragged image before hovered element (i.e., [hoverIndex, 0, draggedImage])
      - remove the previous reference of dragged element (i.e., [dragIndex, 1])
      - here we are using this update helper method from immutability-helper package
    */
    setImages(
      update(images, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, draggedImage],
        ],
      })
    );

    setFiles(
      update(files, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, draggedFile],
        ],
      })
    );
  };

  const onDrop = useCallback((acceptedFiles) => {
    // Return if user uploads more than max # of images in one drop
    if (acceptedFiles.length > MAXFILES) {
      setMessage(`Please upload less or equal to ${MAXFILES} images`);
      return;
    }

    // Increment image count
    imgCount += acceptedFiles.length;
    // Return if image count exceeds max
    if (imgCount > MAXFILES) {
      setMessage(`Please upload less or equal to ${MAXFILES} images`);
      imgCount -= acceptedFiles.length;
      return;
    }

    // Loop through accepted files
    acceptedFiles.map((file) => {
      setFiles((prevState) => [...prevState, file]);

      const reader = new FileReader();
      // onload callback gets called after the reader reads the file data
      reader.onload = (e) => {
        setImages((prevState) => [
          ...prevState,
          { id: cuid(), src: e.target.result },
        ]);
      };
      // Read the file as Data URL (since we accept only images)
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      isNullable(title) ||
      isNullable(price) ||
      isNullable(location) ||
      isNullable(condition)
    ) {
      setMessage("All required fields must be entered");
      return;
    }

    // Check if exceeds max number of images
    if (files.length > 6) {
      setMessage(`Please upload less or equal to ${MAXFILES} images`);
      return;
    }

    // Price can not be negative
    if (price < 0) {
      setMessage("Please enter a price greater than or equal to 0");
      return;
    }

    const newListing = {
      writer: userData.user.id,
      title: title,
      price: price,
      date: new Date(),
      location: location,
      desc: desc,
      condition: condition,
      cuid: cuid(),
    };

    Axios.post("http://localhost:5000/listings/add", newListing, {
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
      },
    })
      .then((res) => {
        // No images uploaded
        if (files.length === 0) {
          setMessage("Product successfully uploaded");
          history.push("/");
          return;
        }
        // Prepare images
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
          formData.append("images", files[i]);
        }

        // Upload images
        return Axios.post(
          "http://localhost:5000/listings/add/images",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "listing-id": res.data.id,
            },
          }
        );
      })
      .then(() => {
        setMessage("Listing uploaded");
        history.push("/");
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
          <h2>Add a listing</h2>
          {message ? (
            <UploadMessages
              msg={message}
              clearError={() => {
                setMessage(undefined);
              }}
            />
          ) : null}
          <Form onSubmit={onSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="the more detail the better!"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="250"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formZipcode">
                <Form.Label>Location</Form.Label>
                <Select
                  isSearchable
                  placeholder="Search for your city"
                  onChange={(e) => {
                    setLocation(e.value);
                  }}
                  options={cities}
                />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="4"
                placeholder="Retail price, Condition, Measurements, Shipping Policy, etc"
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="formCondition">
              <Form.Label>Condition</Form.Label>
              <Form.Control
                as="select"
                defaultValue="Choose..."
                onChange={(e) => {
                  setCondition(e.target.value);
                }}
              >
                <option>Choose...</option>
                <option>New/Never Used</option>
                <option>Gently Used</option>
                <option>Used</option>
                <option>Heavily Used</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formImages">
              <Form.Label>Images</Form.Label>
              <ListingImageUpload onDrop={onDrop} />
              <DndProvider backend={HTML5Backend}>
                <ImageList images={images} moveImage={moveImage} />
              </DndProvider>
            </Form.Group>
            <Button
              variant="craigslist-purple"
              type="submit"
              onSubmit={onSubmit}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Sell;
