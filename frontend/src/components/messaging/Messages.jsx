/* eslint-disable no-nested-ternary */
/* eslint-disable prefer-destructuring */
import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { Container, Row, Tab, Nav, Col, Accordion } from "react-bootstrap";
import { socket } from "../../services/socket";
import UserContext from "../../context/UserContext";
import ConversationBox from "./ConversationBox";
import ProfileCard from "../users/ProfileCard";
import LoadingSpinner from "../shared/LoadingSpinner";

// Group an array of objects by property
const groupBy = (arr, property) => {
  return arr.reduce((acc, curr) => {
    if (!acc[curr[property]]) {
      acc[curr[property]] = [];
    }
    acc[curr[property]].push(curr);
    return acc;
  }, {});
};

const Messages = () => {
  const { userData } = useContext(UserContext);

  const [buyMessages, setBuyMessages] = useState({});
  const [buyLoading, setBuyLoading] = useState(true);
  const [sellMessages, setSellMessages] = useState({});
  const [sellLoading, setSellLoading] = useState(true);

  const getBuyMessages = () => {
    Axios.get("http://localhost:5000/chats/buy_messages", {
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
      },
    })
      .then((res) => {
        const chats = res.data;
        // Sort by listings
        const sortedChats = groupBy(chats, "listing");
        setBuyMessages(sortedChats);
        setBuyLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getSellMessages = () => {
    Axios.get("http://localhost:5000/chats/sell_messages", {
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
      },
    })
      .then((res) => {
        const chats = res.data;
        // Sort by listings
        const sortedChats = groupBy(chats, "listing");
        setSellMessages(sortedChats);
        setSellLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    socket.on("Output Chat Sent", (msg) => {
      if (msg.listing.writer === userData.user.id) {
        // User made listing, add to sell messages
        getSellMessages();
      } else {
        // Add to buy messages
        getBuyMessages();
      }
    });

    socket.on("Output Offer Sent", (msg) => {
      if (msg.listing.writer === userData.user.id) {
        getSellMessages();
      } else {
        getBuyMessages();
      }
    });

    getBuyMessages();
    getSellMessages();

    return () => {
      socket.off();
    };
  }, []);

  return (
    <Container fluid>
      <ProfileCard writer={userData.user} />
      <Row className="my-4">
        <Tab.Container defaultActiveKey="Buy Messages">
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Nav
              fill
              variant="pills"
              className="justify-content-center message-tabs"
            >
              <Nav.Item>
                <Nav.Link eventKey="Buy Messages">Buy Messages</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Sell Messages">Sell Messages</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Tab.Content>
              <Tab.Pane eventKey="Buy Messages">
                <Accordion className="mt-4">
                  {buyLoading ? (
                    <LoadingSpinner className="centered-on-page-spinner" />
                  ) : Object.keys(buyMessages).length === 0 ? (
                    <h3>No Messages</h3>
                  ) : (
                    Object.keys(buyMessages).map((key) => (
                      <ConversationBox
                        key={key}
                        socket={socket}
                        listing={key}
                        user={userData.user}
                        conversations={buyMessages[key]}
                      />
                    ))
                  )}
                </Accordion>
              </Tab.Pane>
              <Tab.Pane eventKey="Sell Messages">
                <Accordion className="mt-4">
                  {sellLoading ? (
                    <LoadingSpinner className="centered-on-page-spinner" />
                  ) : Object.keys(sellMessages).length === 0 ? (
                    <h3>No Messages</h3>
                  ) : (
                    Object.keys(sellMessages).map((key) => (
                      <ConversationBox
                        key={key}
                        socket={socket}
                        listing={key}
                        user={userData.user}
                        conversations={buyMessages[key]}
                      />
                    ))
                  )}
                </Accordion>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Tab.Container>
      </Row>
    </Container>
  );
};

export default Messages;
