/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const MessageModal = (props) => {
  const { onSendMessage, setChatMessage, ...rest } = props;

  return (
    <Modal
      {...rest}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Ask A Question
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Send a message to request more details or discuss price"
            onChange={(e) => setChatMessage(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="purple"
          disabled={props.disabled}
          onClick={onSendMessage}
        >
          Send Message
        </Button>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MessageModal;
