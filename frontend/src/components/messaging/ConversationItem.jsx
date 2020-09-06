import React from "react";
import moment from "moment";
import { Image } from "react-bootstrap";
import { isDefined } from "../../utils/null-checks";

const ConversationItem = ({ conversation }) => {
  return (
    <li className="media my-2">
      <Image
        src={`http://localhost:5000/${conversation.writer.image.filePath}`}
        className="align-self-start mr-3"
        alt="Writer Avatar"
        roundedCircle
        width="32"
        height="32"
      />
      <div className="mr-4">
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
              className="bi bi-wallet-fill mr-2"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginBottom: ".25em" }}
            >
              <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v2h6a.5.5 0 0 1 .5.5c0 .253.08.644.306.958.207.288.557.542 1.194.542.637 0 .987-.254 1.194-.542.226-.314.306-.705.306-.958a.5.5 0 0 1 .5-.5h6v-2A1.5 1.5 0 0 0 14.5 2h-13z" />
              <path d="M16 6.5h-5.551a2.678 2.678 0 0 1-.443 1.042C9.613 8.088 8.963 8.5 8 8.5c-.963 0-1.613-.412-2.006-.958A2.679 2.679 0 0 1 5.551 6.5H0v6A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-6z" />
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