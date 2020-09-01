/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const OfferModal = (props) => {
  const { deleteFunc, ...rest } = props;

  return (
    <Modal
      {...rest}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
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
          />
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Leave any additional messages"
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="purple" onClick={deleteFunc}>
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
