import React, { useEffect, useState } from "react";
import Axios from "axios";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Spinner,
  Button,
} from "react-bootstrap";
import Listing from "./listing/Listing";
import UploadMessages from "./shared/UploadMessages";

const Home = () => {
  const [listingData, setListingData] = useState({
    listings: undefined,
    loading: true,
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const getListings = () => {
      Axios.get("http://localhost:5000/listings/")
        .then((res) => {
          setListingData({ listings: res.data, loading: false });
        })
        .catch((err) => {
          setMessage("Unable to fetch listings. Please try again");
          console.error(err);
        });
    };

    getListings();
  }, []);

  return listingData.loading ? (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  ) : (
    <main>
      <Container fluid>
        <Row>
          {message ? (
            <UploadMessages
              msg={message}
              clearError={() => {
                setMessage(undefined);
              }}
            />
          ) : null}
          <Col lg={2}>
            <ListGroup className="my-4">
              <ListGroup.Item active>Category 1</ListGroup.Item>
              <ListGroup.Item>Category 2</ListGroup.Item>
              <ListGroup.Item>Category 3</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col lg={10}>
            <Row>
              {listingData.listings.map((listing) => (
                <Listing
                  title={listing.title}
                  date={listing.date}
                  desc={listing.desc}
                  price={listing.price}
                  image={listing.image}
                  location={listing.location}
                  cuid={listing.cuid}
                  key={listing.cuid}
                />
              ))}
            </Row>
            <Button variant="primary">Load More</Button>{" "}
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Home;
