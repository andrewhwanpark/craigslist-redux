import React from "react";
import { Col, Row } from "react-bootstrap";
import { isNullable } from "../utils/null-checks";
import LocationSelector from "./shared/LocationSelector";

const Sidebar = ({ location, setLocation, setSkip }) => {
  const onChange = (e) => {
    // If user clears search, show listings from all locations
    // e will be null when user clears react-select form
    if (isNullable(e)) {
      setLocation(undefined);
      setSkip(0);
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
