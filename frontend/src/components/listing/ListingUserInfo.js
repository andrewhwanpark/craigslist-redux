import React from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

const ListingUserInfo = () => {
  return (
    <div>
      <Image
        src="https://crossfithvl.com/wp-content/uploads/2016/09/profile-placeholder-copy-2.png"
        roundedCircle
        width="50"
        height="50"
      />
      <Link>
        <span>username</span>
        <span>(0)</span>
      </Link>
      <Link>
        <span>0 listings for sale</span>
      </Link>
    </div>
  );
};

export default ListingUserInfo;
