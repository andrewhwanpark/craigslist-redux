import React from "react";
import moment from "moment";
import { Image } from "react-bootstrap";
import { isDefined } from "../../utils/null-checks";

const ConversationItem = ({ conversation }) => {
  return (
    <li className="media my-2">
      <Image
        src={`/${conversation.writer.image.filePath}`}
        className="align-self-start mr-3"
        alt="Writer Avatar"
        roundedCircle
        width="32"
        height="32"
      />
      <div className="mr-4 conversation-user" style={{ width: "150px" }}>
        <span className="font-weight-bold">{conversation.writer.username}</span>
        <br />
        <span className="text-muted">
          {moment(conversation.date).fromNow()}
        </span>
      </div>
      <div className="media-body">
        {isDefined(conversation.offerPrice) ? (
          <>
            <svg
              width="1.25em"
              height="1.25em"
              viewBox="0 0 16 16"
              className="bi bi-cash-stack mr-2 mb-1"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14 3H1a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1h-1z" />
              <path
                fillRule="evenodd"
                d="M15 5H1v8h14V5zM1 4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H1z"
              />
              <path d="M13 5a2 2 0 0 0 2 2V5h-2zM3 5a2 2 0 0 1-2 2V5h2zm10 8a2 2 0 0 1 2-2v2h-2zM3 13a2 2 0 0 0-2-2v2h2zm7-4a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
            </svg>
            <span className="lead">{`New Offer: $${conversation.offerPrice}`}</span>
            <br />
          </>
        ) : null}
        {conversation.message}
      </div>
    </li>
  );
};

export default ConversationItem;
