/* eslint-disable prefer-destructuring */
import React, { useState, useEffect, useContext, useRef } from "react";
import io from "socket.io-client";
import {
  Container,
  Row,
  InputGroup,
  Button,
  FormControl,
} from "react-bootstrap";
import UserContext from "../../context/UserContext";

const Messages = () => {
  // Socket doesn't need to be part of state, use reference
  const { current: socket } = useRef(io("http://localhost:5000"));

  const { userData } = useContext(UserContext);

  const [chatMessage, setChatMessage] = useState("");

  useEffect(() => {
    socket.on("Output Chat Sent", (msg) => {
      console.log(msg);
    });

    return () => {
      socket.off();
    };
  }, []);

  const onChatSubmit = (e) => {
    e.preventDefault();

    const id = userData.user.id;
    const date = new Date();

    socket.emit(
      "Chat Sent",
      {
        chatMessage,
        id,
        date,
      },
      (err) => {
        if (err) console.error(err);
      }
    );

    setChatMessage("");
  };

  return (
    <Container>
      <Row>
        <h2 className="text-center my-4">Messages</h2>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Chat with the user"
            aria-label="Chat with the user"
            aria-describedby="basic-addon2"
            value={chatMessage}
            onChange={(e) => {
              setChatMessage(e.target.value);
            }}
          />
          <InputGroup.Append>
            <Button variant="outline-secondary" onClick={onChatSubmit}>
              Send
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Row>
    </Container>
  );
};

export default Messages;
