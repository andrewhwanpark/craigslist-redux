import React, { useEffect, useState, useContext, useRef } from "react";
import Axios from "axios";
import io from "socket.io-client";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
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
import { isDefined } from "../../utils/null-checks";

const ListingDetail = (props) => {
  const {
    match: {
      params: { id },
    },
  } = props;

  const { current: socket } = useRef(io("http://localhost:5000"));

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
    Axios.get(
      `http://localhost:5000/listings/listings_by_id?id=${id}&type=single`
    )
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
  }, []);

  const deleteListing = () => {
    Axios.delete(`http://localhost:5000/listings/${id}`)
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onSendOffer = () => {
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

          <ListingUserInfo writer={listing.writer} />
        </Col>
      </Row>
    </Container>
  );
};

export default ListingDetail;
