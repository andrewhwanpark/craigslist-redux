import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import { isDefined, isNullable } from "../../utils/null-checks";
import LoadingSpinner from "../shared/LoadingSpinner";
import Listing from "../listing/Listing";

const Favorites = () => {
  const { userData } = useContext(UserContext);
  const [listings, setListings] = useState();
  const [loading, setLoading] = useState(true);

  const favorites =
    userData.user.favorites.length === 0
      ? undefined
      : userData.user.favorites.join(",");

  useEffect(() => {
    if (isDefined(favorites)) {
      Axios.get(
        `http://localhost:5000/listings/listings_by_id?id=${favorites}&type=array`
      )
        .then((res) => {
          setListings(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <LoadingSpinner className="centered-on-page-spinner" />;
  }

  return (
    <Container fluid>
      <h2 className="text-center my-4">Favorites</h2>
      <hr className="my-0" />
      <Row className="my-4">
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

  // return loading ? (
  //   <LoadingSpinner className="centered-on-page-spinner" />
  // ) : (
  //   <Container fluid>
  //     <h2 className="text-center">Favorites</h2>
  //     <Row className="my-4">
  //       {listings.map((listing) => (
  //         <Listing
  //           title={listing.title}
  //           date={listing.date}
  //           desc={listing.desc}
  //           price={listing.price}
  //           image={listing.image}
  //           location={listing.location}
  //           id={listing._id}
  //           key={listing._id}
  //         />
  //       ))}
  //     </Row>
  //   </Container>
  // );
};

export default Favorites;
