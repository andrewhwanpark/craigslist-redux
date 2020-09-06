import React, { useEffect, useState } from "react";
import Axios from "axios";
import { css } from "glamor";
import ScrollToBottom from "react-scroll-to-bottom";
import { Accordion, Card, Button, Image } from "react-bootstrap";
import ConversationItem from "./ConversationItem";
import ChatInput from "./ChatInput";

const SCROLL_TO_BOTTOM_CSS = css({
  height: 300,
});

const ConversationBox = ({ listing, conversations }) => {
  const [listingTitle, setListingTitle] = useState();
  const [listingImagePath, setListingImagePath] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(
      `http://localhost:5000/listings/listings_by_id?id=${listing}&type=single`
    ).then((res) => {
      setListingTitle(res.data[0].title);
      setListingImagePath(res.data[0].image[0].filePath);

      setLoading(false);
    });
  }, []);

  return loading ? null : (
    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey={listing}>
          <Image
            src={`http://localhost:5000/${listingImagePath}`}
            roundedCircle
            width="64"
            height="64"
            className="mr-4"
          />
          {listingTitle}
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={listing}>
        <Card.Body>
          <ScrollToBottom className={`${SCROLL_TO_BOTTOM_CSS}`}>
            <ul className="list-unstyled">
              {conversations.map((convo) => (
                <ConversationItem key={convo._id} conversation={convo} />
              ))}
            </ul>
          </ScrollToBottom>
          <ChatInput />
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default ConversationBox;
