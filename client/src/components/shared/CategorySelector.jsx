import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import categories from "../../data/categories";
import { isDefined } from "../../utils/null-checks";

const CategorySelector = ({
  onChange,
  className,
  isClearable,
  isMulti,
  defaultValue,
}) => {
  const animatedComponents = makeAnimated();

  const groupStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const groupBadgeStyles = {
    backgroundColor: "#EBECF0",
    borderRadius: "2em",
    color: "#172B4D",
    display: "inline-block",
    fontSize: 12,
    fontWeight: "normal",
    lineHeight: "1",
    minWidth: 1,
    padding: "0.16666666666667em 0.5em",
    textAlign: "center",
  };

  const formatGroupLabel = (data) => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  // If provided with default value, find
  let found = null;
  if (isDefined(defaultValue)) {
    for (let i = 0; i < categories.length; i += 1) {
      found = categories[i].options.find(
        (option) => option.value === defaultValue
      );

      if (isDefined(found)) break;
    }
  }

  return (
    <Select
      isSearchable
      options={categories}
      components={animatedComponents}
      isClearable={isClearable}
      isMulti={isMulti}
      defaultValue={found}
      placeholder="Search for categories"
      onChange={onChange}
      className={className}
      formatGroupLabel={formatGroupLabel}
    />
  );
};

export default CategorySelector;
