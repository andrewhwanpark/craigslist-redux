import React from "react";
import Select from "react-select";
import { cities } from "../../cities";

const LocationSelector = (props) => {
  return (
    <Select
      isSearchable
      placeholder="Search for your city"
      onChange={props.onChange}
      options={cities}
    />
  );
};

export default LocationSelector;
