import React from "react";
import Select from "react-select";
import { cities } from "../../cities";

const LocationSelector = ({ onChange, className }) => {
  return (
    <Select
      isSearchable
      placeholder="Search for your city"
      onChange={onChange}
      options={cities}
      className={className}
    />
  );
};

export default LocationSelector;
