import React from "react";
import { Col, Row } from "react-bootstrap";
import { isNullable } from "../utils/null-checks";
import LocationSelector from "./shared/LocationSelector";
import CategorySelector from "./shared/CategorySelector";

const Sidebar = ({ location, setLocation, setSkip }) => {
  const onLocationChange = (e) => {
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
    <Row className="mt-4">
      <Col className="my-2" xl={12} lg={12} md={6} sm={6} xs={6}>
        <LocationSelector
          isClearable
          onChange={onLocationChange}
          defaultValue={location}
        />
      </Col>
      <Col className="my-2" xl={12} lg={12} md={6} sm={6} xs={6}>
        <CategorySelector
          isClearable
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </Col>
    </Row>
  );
};

export default Sidebar;
