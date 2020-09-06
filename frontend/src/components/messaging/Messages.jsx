/* eslint-disable prefer-destructuring */
import React, { useState, useEffect, useContext, useRef } from "react";
import Axios from "axios";
import io from "socket.io-client";
import { Container, Row, Tab, Nav, Col, Accordion } from "react-bootstrap";
import UserContext from "../../context/UserContext";
import ConversationBox from "./ConversationBox";
import ProfileCard from "../users/ProfileCard";

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
  // Socket doesn't need to be part of state, use reference
  const { current: socket } = useRef(io("http://localhost:5000"));

  const { userData } = useContext(UserContext);

  const [buyMessages, setBuyMessages] = useState({});

  useEffect(() => {
    socket.on("Output Chat Sent", (msg) => {
      console.log(msg);
    });

    socket.on("Output Offer Sent", (msg) => {
      console.log(msg);
    });

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
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      socket.off();
    };
  }, []);

  // const onChatSubmit = (e) => {
  //   e.preventDefault();

  //   const id = userData.user.id;
  //   const date = new Date();

  //   socket.emit(
  //     "Chat Sent",
  //     {
  //       chatMessage,
  //       id,
  //       date,
  //     },
  //     (err) => {
  //       if (err) console.error(err);
  //     }
  //   );

  //   setChatMessage("");
  // };

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
                  {Object.keys(buyMessages).map((key) => (
                    <ConversationBox
                      key={key}
                      listing={key}
                      user={userData.user}
                      conversations={buyMessages[key]}
                    />
                  ))}
                </Accordion>
              </Tab.Pane>
              <Tab.Pane eventKey="Sell Messages">
                <h1>Hi</h1>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Tab.Container>
      </Row>
    </Container>
  );
};

export default Messages;
