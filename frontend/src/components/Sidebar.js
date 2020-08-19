import React from "react";
import LocationSelector from "./shared/LocationSelector";

const Sidebar = ({ setLocation }) => {
  return (
    <div className="my-4">
      <LocationSelector
        onChange={(e) => {
          setLocation(e.value);
        }}
      />
    </div>
  );
};

export default Sidebar;
