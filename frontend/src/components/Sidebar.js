import React, { useState } from "react";
import Select from "react-select";
import { cities } from "../cities";
import { Col, Row } from "react-bootstrap";
import { isNullable } from "../utils/null-checks";

const Sidebar = ({ setLocation }) => {
  const [displayValue, setDisplayValue] = useState([]);

  return (
    <Row className="my-4">
      <Col xl={12} lg={12} md={12} sm={12} xs={12}>
        <Select
          isSearchable
          isClearable
          placeholder="Search your city"
          onChange={(e) => {
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
          }}
          options={cities}
          value={displayValue}
        />
      </Col>
    </Row>
  );
};

export default Sidebar;
