import React from "react";
import Select from "react-select";
import cities from "../../data/cities";
import { isNullable } from "../../utils/null-checks";

const LocationSelector = ({
  onChange,
  className,
  isClearable,
  defaultValue,
}) => {
  const defaultLabel = isNullable(defaultValue)
    ? null
    : cities.find((city) => city.value === defaultValue);

  return (
    <Select
      isSearchable
      isClearable={isClearable}
      placeholder="Search for your city"
      onChange={onChange}
      options={cities}
      className={className}
      defaultValue={defaultLabel}
    />
  );
};

export default LocationSelector;
