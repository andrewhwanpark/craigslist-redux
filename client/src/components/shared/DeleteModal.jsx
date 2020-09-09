/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteModal = (props) => {
  const { deleteFunc, ...rest } = props;

  return (
    <Modal
      {...rest}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete {props.name}?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>This action can not be reversed. Are you sure?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={deleteFunc}>
          Delete
        </Button>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
