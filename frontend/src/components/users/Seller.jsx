import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Axios from "axios";
import LoadingSpinner from "../shared/LoadingSpinner";
import ProfileCard from "./ProfileCard";
import Listing from "../listing/Listing";
import UploadMessages from "../shared/UploadMessages";

const Seller = (props) => {
  const {
    match: {
      params: { username },
    },
  } = props;

  const [writer, setWriter] = useState();
  const [listings, setListings] = useState();
  const [loading, setLoading] = useState(true);
  // Error message
  const [message, setMessage] = useState();

  useEffect(() => {
    const getSellerListings = () => {
      Axios.get(
        `http://localhost:5000/users/find_by_username?username=${username}`
      )
        .then((res) => {
          setWriter(res.data[0]);

          return Axios.get(
            `http://localhost:5000/listings/listings_by_user?id=${res.data[0]._id}`
          );
        })
        .then((res) => {
          setListings(res.data);
          setLoading(false);
        })
        .catch(() => {
          setMessage("Server Error: Failed to upload");
          setLoading(false);
        });
    };

    getSellerListings();
  }, []);

  return loading ? (
    <LoadingSpinner className="centered-on-page-spinner" />
  ) : (
    <Container fluid>
      <ProfileCard writer={writer} hideEditButton />
      <Row className="my-4">
        {message ? (
          <Col>
            <UploadMessages
              msg={message}
              clearError={() => {
                setMessage(undefined);
              }}
            />
          </Col>
        ) : null}
        {listings.map((listing) => (
          <Listing
            title={listing.title}
            date={listing.date}
            desc={listing.desc}
            price={listing.price}
            image={listing.image}
            location={listing.location}
            id={listing._id}
            key={listing._id}
          />
        ))}
      </Row>
    </Container>
  );
};

export default Seller;