import React, { useState } from "react";
import Select from "react-select";
import { cities } from "../cities";
import { Col, Button, Row } from "react-bootstrap";
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
      {/* <Col
        className="my-2 px-0"
        xl="auto"
        lg="auto"
        md="auto"
        sm="auto"
        xs="auto"
        style={{
          margin: "auto",
        }}
      >
        <Button
          variant="purple"
          onClick={() => {
            setDisplayValue(null);
            setLocation(undefined);
          }}
        >
          View All
        </Button>
      </Col> */}
    </Row>
  );
};

export default Sidebar;
