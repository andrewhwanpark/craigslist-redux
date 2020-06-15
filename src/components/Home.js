import React, { useContext } from "react";
import { ListingContext } from "../Context";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import Listing from "./Listing";

function Home() {
  const { contextListings } = useContext(ListingContext);
  const [listings, setListings] = contextListings;

  return (
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
                  price={listing.price}
                  date={listing.date}
                  image={listing.image}
                  id={listing.id}
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
