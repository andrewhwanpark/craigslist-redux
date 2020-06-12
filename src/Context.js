import React, { useState, createContext } from "react";
import { data } from "./data";

export const ListingContext = createContext();

export const ListingProvider = (props) => {
  const [listings, setListings] = useState(data)

  return (
    <ListingContext.Provider value={[listings, setListings]}>
      {props.children}
    </ListingContext.Provider>
  );
};
