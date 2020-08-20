import React from "react";
import { Col, Row } from "react-bootstrap";
import { isNullable } from "../utils/null-checks";
import LocationSelector from "./shared/LocationSelector";

const Sidebar = ({ location, setLocation }) => {
  const onChange = (e) => {
    // User clears search, show all listing
    if (isNullable(e)) {
      setLocation(undefined);
      return;
    }

    setLocation(e.value);
  };

  return (
    <Row className="my-4">
      <Col xl={12} lg={12} md={12} sm={12} xs={12}>
        <LocationSelector
          isClearable={true}
          onChange={onChange}
          defaultValue={location}
        />
      </Col>
    </Row>
  );
};

export default Sidebar;
