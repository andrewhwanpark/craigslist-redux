import React from "react";
import { InputGroup, Button, FormControl } from "react-bootstrap";

const ChatInput = ({ chatMessage, setChatMessage, onChatSubmit }) => {
  return (
    <InputGroup className="mt-4">
      <FormControl
        placeholder="Chat with the user"
        aria-label="Chat with the user"
        aria-describedby="chat-input"
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
  );
};

export default ChatInput;
