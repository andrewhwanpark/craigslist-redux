import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useContext,
} from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Axios from "axios";
import cuid from "cuid";
import { useHistory } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import ListingImageUpload from "../sell/ListingImageUpload";
import ImageList from "../sell/ImageList";
import { isNullable, isDefined } from "../../utils/null-checks";
import LocationSelector from "../shared/LocationSelector";
import CategorySelector from "../shared/CategorySelector";
import LoadingSpinner from "../shared/LoadingSpinner";
import UserContext from "../../context/UserContext";
import AlertMsg from "../shared/AlertMsg";

const EditListing = (props) => {
  const { setGlobalMsg } = useContext(UserContext);

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

  const [loading, setLoading] = useState(true);

  // Error message
  const [message, setMessage] = useState();

  // Max number of images to be uploaded
  const MAXFILES = 6;

  // Counter to track # of images
  const imageCount = useRef(0);

  // Fetch listing and pre-fill all fields and images
  useEffect(() => {
    Axios.get(
      `http://localhost:5000/listings/listings_by_id?id=${props.match.params.id}&type=single`
    )
      .then((res) => {
        setTitle(res.data[0].title);
        setPrice(res.data[0].price);
        setLocation(res.data[0].location);
        setCategory(res.data[0].category);
        setDesc(res.data[0].desc);
        setCondition(res.data[0].condition);

        // Prepare images for upload preview
        const preparedImgs = res.data[0].image.map((img) => ({
          ...img,
          id: cuid(),
          src: `http://localhost:5000/${img.filePath}`,
        }));

        setImages(preparedImgs);
        setFiles(res.data[0].image);

        // Set image counter tracking # of images to be sent
        imageCount.current = res.data[0].image.length;

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

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

    // Check if new images have been added
    let imagesChanged = false;

    files.forEach((file) => {
      if (isNullable(file.filePath)) {
        imagesChanged = true;
      }
    });

    // If no new images have been added, we can make one API call
    if (!imagesChanged) {
      const updatedListing = {
        title,
        price,
        location,
        category,
        files,
        desc,
        condition,
      };

      Axios.post(
        `http://localhost:5000/listings/update/${props.match.params.id}`,
        updatedListing,
        {
          headers: {
            "x-auth-token": localStorage.getItem("auth-token"),
          },
        }
      )
        .then(() => {
          resetForm();
        })
        .catch((err) => {
          console.error(err);
          setMessage("Server Error: Failed to upload");
        });
    } else {
      const updatedListing = {
        title,
        price,
        location,
        category,
        files: undefined,
        desc,
        condition,
      };

      Axios.post(
        `http://localhost:5000/listings/update/${props.match.params.id}`,
        updatedListing,
        {
          headers: {
            "x-auth-token": localStorage.getItem("auth-token"),
          },
        }
      )
        .then(() => {
          // Prepare images
          const formData = new FormData();

          files.forEach((file) => {
            // Some files in iteration may be files already existing in backend
            // Thus check if a property only existant on the pre-existing files is defined (filePath)
            if (isNullable(file.filePath)) {
              formData.append("images", file);
            }
          });

          // Create binary order array
          // 1: new, 0: original
          const order = [];
          const filenames = [];
          files.forEach((file) => {
            if (isDefined(file.filePath)) {
              order.push(0);
              filenames.push(file.fileName);
            } else {
              order.push(1);
            }
          });

          return Axios.post(
            `http://localhost:5000/listings/updateImages/?id=${
              props.match.params.id
            }&order=${order.join(",")}&filenames=${filenames.join(",")}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        })
        .then(() => {
          resetForm();
        })
        .catch((err) => {
          console.error(err);
          setMessage("Server Error: Failed to upload");
        });
    }
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

  return loading ? (
    <LoadingSpinner className="centered-on-page-spinner" />
  ) : (
    <Container fluid>
      <Row className="my-4">
        <Col lg={12}>
          <h2>Edit your listing</h2>
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
                  defaultValue={title}
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
                  defaultValue={price}
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
                  defaultValue={location}
                  onChange={(e) => {
                    setLocation(e.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <CategorySelector
                  isMulti={false}
                  defaultValue={category}
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
                defaultValue={desc}
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
                defaultValue={condition}
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
            <Button variant="purple" type="submit" onSubmit={onSubmit}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditListing;
