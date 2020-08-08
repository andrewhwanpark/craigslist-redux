import React, { useState, useCallback } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import cuid from "cuid";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import ListingImageUpload from "./ListingImageUpload";
import ImageList from "./ImageList";

const Sell = () => {
  const [images, setImages] = useState([]);

  const moveImage = (dragIndex, hoverIndex) => {
    // Get the dragged element
    const draggedImage = images[dragIndex];
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
  };

  const onDrop = useCallback((acceptedFiles) => {
    // Loop through accepted files
    acceptedFiles.map((file) => {
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
              <ListingImageUpload onDrop={onDrop} />
              <DndProvider backend={HTML5Backend}>
                <ImageList images={images} moveImage={moveImage} />
              </DndProvider>
            </Form.Group>
            <Button variant="dark" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Sell;
