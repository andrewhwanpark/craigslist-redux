import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import { isDefined, isNullable } from "../../utils/null-checks";
import LoadingSpinner from "../shared/LoadingSpinner";
import Listing from "../listing/Listing";
import AlertMsg from "../shared/AlertMsg";

const Favorites = () => {
  const { userData } = useContext(UserContext);
  const [listings, setListings] = useState();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState();

  const favorites =
    userData.user.favorites.length === 0
      ? undefined
      : userData.user.favorites.join(",");

  useEffect(() => {
    const getFavorites = () => {
      if (isDefined(favorites)) {
        Axios.get(`/api/listings/listings-by-id?id=${favorites}&type=array`)
          .then((res) => {
            setListings(res.data);
            setLoading(false);
          })
          .catch(() => {
            setMessage("Server error. Please try again");
          });
      } else {
        setLoading(false);
      }
    };

    getFavorites();
  }, [favorites]);

  if (loading) {
    return <LoadingSpinner className="centered-on-page-spinner" />;
  }

  return (
    <Container fluid>
      <h2 className="text-center my-4">Favorites</h2>
      <h5 className="text-center mb-4">
        <small className="text-muted">
          Click the star icon in listings to favorite and unfavorite them
        </small>
      </h5>
      <hr className="my-0" />
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
        {isNullable(favorites) ? (
          <Col className="text-center">
            <h4>No favorites</h4>
          </Col>
        ) : (
          listings.map((listing) => (
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
          ))
        )}
      </Row>
    </Container>
  );
};

export default Favorites;
