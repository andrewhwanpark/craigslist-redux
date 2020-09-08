import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Axios from "axios";
import LoadingSpinner from "../shared/LoadingSpinner";
import ProfileCard from "./ProfileCard";
import Listing from "../listing/Listing";
import Default from "../Default";
import AlertMsg from "../shared/AlertMsg";

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
  // 404
  const [noRoute, setNoRoute] = useState(false);

  useEffect(() => {
    const getSellerListings = () => {
      Axios.get(
        `http://localhost:5000/users/find-by-username?username=${username}`
      )
        .then((res) => {
          // 404
          if (res.data.length === 0) {
            setNoRoute(true);
            return undefined;
          }
          setWriter(res.data[0]);

          return Axios.get(
            `http://localhost:5000/listings/listings-by-user?id=${res.data[0]._id}`
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

  // Handle 404 error
  if (noRoute) return <Default />;

  return loading ? (
    <LoadingSpinner className="centered-on-page-spinner" />
  ) : (
    <Container fluid>
      <ProfileCard writer={writer} hideEditButton />
      <Row className="my-4">
        {message ? (
          <Col>
            <AlertMsg
              msg={message}
              variant="danger"
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
