import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import ListingImageCarousel from "./ListingImageCarousel";
import ListingUserInfo from "./ListingUserInfo";
import LoadingSpinner from "../shared/LoadingSpinner";
import FavoritesToggle from "./FavoritesToggle";
import ListingBreadcrumb from "./ListingBreadcrumb";
import UserContext from "../../context/UserContext";

const ListingDetail = (props) => {
  const {
    match: {
      params: { id },
    },
  } = props;

  const { userData } = useContext(UserContext);

  const [userIsWriter, setUserIsWriter] = useState(false);
  const [listing, setListing] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(
      `http://localhost:5000/listings/listings_by_id?id=${id}&type=single`
    )
      .then((res) => {
        // Check if user is the writer of the listing
        if (res.data[0].writer._id === userData.user.id) {
          setUserIsWriter(true);
        }
        setListing(res.data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return loading ? (
    <LoadingSpinner className="centered-on-page-spinner" />
  ) : (
    <Container fluid className="my-4">
      <ListingBreadcrumb listing={listing} />
      <Row>
        <Col xl={9} lg={8} md={8} sm={12} xs={12}>
          {listing.image.length === 0 ? null : (
            <ListingImageCarousel imgs={listing.image} />
          )}
        </Col>
        <Col xl={3} lg={4} md={4} sm={12} xs={12}>
          <div style={{ overflow: "hidden" }}>
            <h3 style={{ float: "left" }}>{listing.title}</h3>
            <FavoritesToggle id={listing._id} size="1.5em" />
          </div>
          <p>{`$${listing.price}`}</p>

          {userIsWriter ? (
            <>
              <Button variant="purple" size="lg" block>
                Edit
              </Button>
              <Button variant="outline-purple" size="lg" block>
                Delete
              </Button>
            </>
          ) : (
            <>
              <Button variant="purple" size="lg" block>
                Offer
              </Button>
              <Button variant="outline-purple" size="lg" block>
                Message
              </Button>
            </>
          )}

          <p className="font-weight-bold my-4">Description</p>
          <p>{listing.desc}</p>

          <ListingUserInfo writer={listing.writer} />
        </Col>
      </Row>
    </Container>
  );
};

export default ListingDetail;
