/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const OfferModal = (props) => {
  const { onSendOffer, setOfferPrice, setChatMessage, ...rest } = props;

  return (
    <Modal {...rest} size="lg" aria-labelledby="send-offer-modal" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Offer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Control
            size="lg"
            type="number"
            placeholder="Price"
            className="w-25 mb-3 mx-auto"
            onChange={(e) => setOfferPrice(e.target.value)}
          />
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Leave any additional messages"
            onChange={(e) => setChatMessage(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="purple"
          disabled={props.disabled}
          onClick={onSendOffer}
        >
          Send Offer
        </Button>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OfferModal;
