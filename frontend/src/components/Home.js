import React, { useContext } from "react";
import { ListingContext } from "../context/Context";
import { Container, Row, Col, ListGroup, Spinner } from "react-bootstrap";
import Listing from "./listing/Listing";
import UserContext from "../context/UserContext";

function Home() {
  const { listingData } = useContext(UserContext);
  const listings = listingData.listings;
  console.log(listings);

  return listingData.loading ? (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  ) : (
    <main>
      <Container fluid>
        <Row>
          <Col lg={2}>
            <ListGroup className="my-4">
              <ListGroup.Item active>Category 1</ListGroup.Item>
              <ListGroup.Item>Category 2</ListGroup.Item>
              <ListGroup.Item>Category 3</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col lg={10}>
            <Row>
              {listings.map((listing) => (
                <Listing
                  title={listing.title}
                  date={listing.date}
                  desc={listing.desc}
                  price={listing.price}
                  image={listing.image}
                />
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default Home;
