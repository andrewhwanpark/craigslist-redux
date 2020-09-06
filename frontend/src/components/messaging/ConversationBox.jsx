import React from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import ConversationItem from "./ConversationItem";
import ChatInput from "./ChatInput";

const ConversationBox = ({ listing, conversations }) => {
  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey={listing}>
          {listing}
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={listing}>
        <Card.Body>
          <ul className="list-unstyled">
            {conversations.map((convo) => (
              <ConversationItem key={convo._id} conversation={convo} />
            ))}
          </ul>
          <ChatInput />
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default ConversationBox;
