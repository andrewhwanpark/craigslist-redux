import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Container, Row, Col, Breadcrumb, Button } from "react-bootstrap";
import ListingImageCarousel from "./ListingImageCarousel";
import ListingUserInfo from "./ListingUserInfo";
import LoadingSpinner from "../shared/LoadingSpinner";

const ListingDetail = (props) => {
  const cuid = props.match.params.cuid;
  const [listing, setListing] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(
      `http://localhost:5000/listings/listings_by_id?id=${cuid}&type=single`
    ).then((res) => {
      setListing(res.data[0]);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <Container fluid className="my-4">
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>{listing.title}</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col lg={7}>
          {listing.image.length === 0 ? null : (
            <ListingImageCarousel imgs={listing.image} />
          )}
        </Col>
        <Col lg={5}>
          <h3>{listing.title}</h3>
          <p>{"$" + listing.price}</p>

          <Button variant="purple" size="lg" block>
            Offer
          </Button>
          <Button variant="outline-purple" size="lg" block>
            Message
          </Button>

          <p className="font-weight-bold my-4">Description</p>
          <p>{listing.desc}</p>

          <ListingUserInfo writer={listing.writer} />
        </Col>
      </Row>
    </Container>
  );
};

export default ListingDetail;
