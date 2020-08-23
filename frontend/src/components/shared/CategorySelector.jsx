import React from "react";
import Select from "react-select";
import categories from "../../data/categories";

const CategorySelector = () => {
  return <Select isSearchable options={categories} />;
};

export default CategorySelector;
