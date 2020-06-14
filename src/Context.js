import React, { useState, createContext } from "react";
import { data } from "./data";

export const ListingContext = createContext();

export const ListingProvider = (props) => {
  const [listings, setListings] = useState(data);
  const [detail, setDetail] = useState({});

  const getListing = (id) => {
    const listing = listings.find((item) => item.id === id);
    return listing;
  };

  const handleDetail = (id) => {
    const listing = getListing(id);
    setDetail(listing);
  };

  return (
    <ListingContext.Provider
      value={{
        contextListings: [listings, setListings],
        contextDetail: [detail, setDetail],
        contextHandleDetail: handleDetail
      }}
    >
      {props.children}
    </ListingContext.Provider>
  );
};
