import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Row, Col, Image, Button } from "react-bootstrap";

const ProfileCard = ({ writer, hideEditButton }) => {
  return (
    <Row className="mt-4">
      <Col lg={12} className="d-flex align-items-center">
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
        {hideEditButton ? null : (
          <Link to="/users/settings" className="ml-auto">
            <Button variant="purple">Edit Profile</Button>
          </Link>
        )}
      </Col>
      <hr className="mb-0" style={{ width: "100%" }} />
    </Row>
  );
};

export default ProfileCard;
