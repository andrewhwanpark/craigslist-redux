import React from "react";
import moment from "moment";
import { Row, Col, Image } from "react-bootstrap";

const ProfileCard = ({ writer }) => {
  return (
    <Row className="mt-4">
      <Col lg={12}>
        <Image
          src={`http://localhost:5000/${writer.image.filePath}`}
          roundedCircle
          width="70"
          height="70"
          className="mr-2"
          style={{ float: "left" }}
        />
        <span>
          <strong>{writer.username}</strong>
          <br />
          Joined in {moment(writer.createdAt).year()}
          <br />
          Sold {writer.sold} items
        </span>
        <hr className="mb-0"></hr>
      </Col>
    </Row>
  );
};

export default ProfileCard;
