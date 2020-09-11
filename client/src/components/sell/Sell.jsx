import React, { useState, useCallback, useContext, useRef } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Axios from "axios";
import cuid from "cuid";
import { useHistory } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import UserContext from "../../context/UserContext";
import ListingImageUpload from "./ListingImageUpload";
import ImageList from "./ImageList";
import { isNullable } from "../../utils/null-checks";
import LocationSelector from "../shared/LocationSelector";
import CategorySelector from "../shared/CategorySelector";
import AlertMsg from "../shared/AlertMsg";

const Sell = () => {
  // Context
  const { userData, setGlobalMsg } = useContext(UserContext);

  const history = useHistory();

  // States
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [location, setLocation] = useState();
  const [category, setCategory] = useState();
  const [desc, setDesc] = useState();
  const [condition, setCondition] = useState();
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);

  // Error message
  const [message, setMessage] = useState();

  // Max number of images to be uploaded
  const MAXFILES = 6;

  // Counter to track # of images
  const imageCount = useRef(0);

  const resetForm = () => {
    setGlobalMsg({
      message: "Listing updated!",
      variant: "success",
    });
    history.push("/");
  };

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
    imageCount.current += acceptedFiles.length;
    // Return if image count exceeds max
    if (imageCount.current > MAXFILES) {
      setMessage(`Please upload less or equal to ${MAXFILES} images`);
      imageCount.current -= acceptedFiles.length;
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
      isNullable(category) ||
      isNullable(condition) ||
      condition === "Choose..."
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
      title,
      price,
      date: new Date(),
      location,
      category,
      desc,
      condition,
    };

    Axios.post("/api/listings/add", newListing, {
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
      },
    })
      .then((res) => {
        // No images uploaded
        if (files.length === 0) {
          resetForm();
          return undefined;
        }
        // Prepare images
        const formData = new FormData();

        for (let i = 0; i < files.length; i += 1) {
          formData.append("images", files[i]);
        }

        // Upload images
        return Axios.post("/api/listings/add/images", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "listing-id": res.data.id,
          },
        });
      })
      .then(() => {
        resetForm();
      })
      .catch(() => {
        setMessage("Server Error: Failed to upload");
      });
  };

  // Delete image when user clicks "X"
  const onDelete = (index) => {
    // Decrement imgCount local var
    imageCount.current -= 1;

    const newImages = [...images];
    const newFiles = [...files];

    newImages.splice(index, 1);
    newFiles.splice(index, 1);

    setImages(newImages);
    setFiles(newFiles);
  };

  return (
    <Container fluid>
      <Row className="my-4">
        <Col lg={12}>
          <h2>Add a listing</h2>
          {message ? (
            <AlertMsg
              msg={message}
              variant="danger"
              clearError={() => {
                setMessage(undefined);
              }}
            />
          ) : null}
          <Form onSubmit={onSubmit} id="create-listing-form">
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
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formZipcode">
                <Form.Label>Location</Form.Label>
                <LocationSelector
                  onChange={(e) => {
                    setLocation(e.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <CategorySelector
                  isMulti={false}
                  onChange={(e) => {
                    setCategory(e.value);
                  }}
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
                <ImageList
                  images={images}
                  moveImage={moveImage}
                  onDelete={onDelete}
                />
              </DndProvider>
            </Form.Group>
            <Button variant="purple" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Sell;
