import React, { useEffect, useState, useContext } from "react";
import { Container, Row } from "react-bootstrap";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import LoadingSpinner from "../shared/LoadingSpinner";
import Listing from "../listing/Listing";
import ProfileCard from "./ProfileCard";

const MyItems = () => {
  const { userData } = useContext(UserContext);
  const [listings, setListings] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(
      `http://localhost:5000/listings/listings_by_user?id=${userData.user.id}`
    )
      .then((res) => {
        setListings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return loading ? (
    <LoadingSpinner className="centered-on-page-spinner" />
  ) : (
    <Container fluid>
      <ProfileCard writer={userData.user} />
      <Row className="my-4">
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

export default MyItems;
