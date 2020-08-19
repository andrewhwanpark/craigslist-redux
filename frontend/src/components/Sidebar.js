import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { isNullable } from "../utils/null-checks";
import LocationSelector from "./shared/LocationSelector";

const Sidebar = ({ setLocation }) => {
  const [displayValue, setDisplayValue] = useState([]);

  const onChange = (e) => {
    // User clears search, show all listing
    if (isNullable(e)) {
      setDisplayValue(null);
      setLocation(undefined);
      return;
    }

    setDisplayValue([
      {
        label: e.label,
        value: e.value,
      },
    ]);
    setLocation(e.value);
  };

  return (
    <Row className="my-4">
      <Col xl={12} lg={12} md={12} sm={12} xs={12}>
        <LocationSelector
          isClearable={true}
          onChange={onChange}
          value={displayValue}
        />
      </Col>
    </Row>
  );
};

export default Sidebar;
