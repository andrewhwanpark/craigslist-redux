import React from "react";
import { Col, Row } from "react-bootstrap";
import { isNullable } from "../utils/null-checks";
import LocationSelector from "./shared/LocationSelector";
import CategorySelector from "./shared/CategorySelector";

const Sidebar = ({ location, setLocation, setCategories, setSkip }) => {
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

  const onCategoriesChange = (e) => {
    if (isNullable(e)) {
      setCategories([]);
      setSkip(0);
      return;
    }

    setCategories(e.map((category) => category.value));
  };

  return (
    <Row className="mt-4">
      <Col className="my-2" xl={6} lg={6} md={6} sm={6} xs={12}>
        <LocationSelector
          isClearable
          onChange={onLocationChange}
          defaultValue={location}
        />
      </Col>
      <Col className="my-2" xl={6} lg={6} md={6} sm={6} xs={12}>
        <CategorySelector
          isClearable
          isMulti
          onChange={onCategoriesChange}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </Col>
    </Row>
  );
};

export default Sidebar;
