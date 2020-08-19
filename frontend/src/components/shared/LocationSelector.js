import React from "react";
import Select from "react-select";
import { cities } from "../../cities";

const LocationSelector = ({
  onChange,
  className,
  isClearable,
  displayValue,
}) => {
  return (
    <Select
      isSearchable
      isClearable={isClearable}
      placeholder="Search for your city"
      value={displayValue}
      onChange={onChange}
      options={cities}
      className={className}
    />
  );
};

export default LocationSelector;
