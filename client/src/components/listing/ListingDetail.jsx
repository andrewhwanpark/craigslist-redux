import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import moment from "moment";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { socket } from "../../services/socket";
import ListingImageCarousel from "./ListingImageCarousel";
import ListingUserInfo from "./ListingUserInfo";
import LoadingSpinner from "../shared/LoadingSpinner";
import FavoritesToggle from "./FavoritesToggle";
import ListingBreadcrumb from "./ListingBreadcrumb";
import UserContext from "../../context/UserContext";
import DeleteModal from "../shared/DeleteModal";
import Default from "../Default";
import OfferModal from "./OfferModal";
import MessageModal from "./MessageModal";
import { isDefined, isNullable } from "../../utils/null-checks";

const ListingDetail = (props) => {
  const {
    match: {
      params: { id },
    },
  } = props;

  const { userData, setGlobalMsg } = useContext(UserContext);

  const history = useHistory();

  // 404
  const [noRoute, setNoRoute] = useState(false);

  const [userIsWriter, setUserIsWriter] = useState(false);
  const [listing, setListing] = useState();
  const [loading, setLoading] = useState(true);

  const [modalShow, setModalShow] = useState(false);
  const [offerModalShow, setOfferModalShow] = useState(false);
  const [messageModalShow, setMessageModalShow] = useState(false);

  // Offer / Message states
  const [offerPrice, setOfferPrice] = useState();
  const [chatMessage, setChatMessage] = useState();

  useEffect(() => {
    const getListingDetail = () => {
      Axios.get(`/api/listings/listings-by-id?id=${id}&type=single`)
        .then((res) => {
          // Check if user is the writer of the listing
          if (
            isDefined(userData.user) &&
            res.data[0].writer._id === userData.user.id
          ) {
            setUserIsWriter(true);
          }
          setListing(res.data[0]);
          setLoading(false);
        })
        .catch((err) => {
          // set 404 boolean to true
          setNoRoute(true);
          console.error(err);
        });
    };

    getListingDetail();
  }, [id, userData.user]);

  const deleteListing = () => {
    Axios.delete(`/api/listings/${id}`)
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onSendOffer = () => {
    // Handle users not logged in
    if (isNullable(userData.user)) {
      setOfferModalShow(false);
      setGlobalMsg({
        message: "You must be logged in to make offers",
        variant: "danger",
      });
      return;
    }

    // Handle no price
    if (isNullable(offerPrice)) {
      setOfferModalShow(false);
      setGlobalMsg({
        message: "Please enter a valid price",
        variant: "danger",
      });
      return;
    }

    // Offer price can't be less than 50% of original price
    if (offerPrice < 0 || offerPrice < listing.price / 2) {
      setOfferModalShow(false);
      setGlobalMsg({
        message: "You must offer at least 50% of the original price",
        variant: "danger",
      });
      return;
    }

    // Fetch ObjectId of sender & receiver
    const receiverId = listing.writer._id;
    const senderId = userData.user.id;
    const listingId = listing._id;
    const date = new Date();

    socket.emit(
      "Offer Sent",
      {
        chatMessage,
        offerPrice,
        senderId,
        receiverId,
        listingId,
        date,
      },
      (err) => {
        if (err) console.error(err);
      }
    );

    setOfferModalShow(false);
    setGlobalMsg({
      message: "Offer sent!",
      variant: "success",
    });
  };

  const onSendMessage = () => {
    // Handle users not logged in
    if (isNullable(userData.user)) {
      setMessageModalShow(false);
      setGlobalMsg({
        message: "You must be logged in to send messages",
        variant: "danger",
      });
      return;
    }

    // Handle no message
    if (isNullable(chatMessage)) {
      setMessageModalShow(false);
      setGlobalMsg({
        message: "You must be logged in to send messages",
        variant: "danger",
      });
      return;
    }

    const receiverId = listing.writer._id;
    const senderId = userData.user.id;
    const listingId = listing._id;
    const date = new Date();

    socket.emit(
      "Chat Sent",
      {
        chatMessage,
        senderId,
        receiverId,
        listingId,
        date,
      },
      (err) => {
        if (err) console.error(err);
      }
    );

    setMessageModalShow(false);
    setGlobalMsg({
      message: "Message sent!",
      variant: "success",
    });
  };

  // Handle 404 error
  if (noRoute) return <Default />;

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
          <p>
            <span className="font-weight-bold">Condition: </span>
            {listing.condition}
          </p>

          {userIsWriter ? (
            <>
              <Button
                as={Link}
                to={`/detail/${id}/edit`}
                variant="purple"
                size="lg"
                block
              >
                Edit
              </Button>

              <Button
                variant="outline-purple"
                size="lg"
                block
                onClick={() => setModalShow(true)}
              >
                Delete
              </Button>

              <DeleteModal
                name="Listing"
                show={modalShow}
                onHide={() => setModalShow(false)}
                deleteFunc={deleteListing}
              />
            </>
          ) : (
            <>
              <Button
                variant="purple"
                size="lg"
                block
                onClick={() => setOfferModalShow(true)}
              >
                Offer
              </Button>
              <Button
                variant="outline-purple"
                size="lg"
                block
                onClick={() => setMessageModalShow(true)}
              >
                Message
              </Button>

              <OfferModal
                show={offerModalShow}
                onHide={() => setOfferModalShow(false)}
                setOfferPrice={setOfferPrice}
                setChatMessage={setChatMessage}
                onSendOffer={onSendOffer}
              />

              <MessageModal
                show={messageModalShow}
                onHide={() => setMessageModalShow(false)}
                setChatMessage={setChatMessage}
                onSendMessage={onSendMessage}
              />
            </>
          )}

          <p className="font-weight-bold my-4">Description</p>
          <p>{listing.desc}</p>
          <hr />
          <ListingUserInfo writer={listing.writer} />
          <hr />
          <p className="text-muted">
            posted{" "}
            <span className="font-weight-bold">
              {moment(listing.date).fromNow()}
            </span>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default ListingDetail;
