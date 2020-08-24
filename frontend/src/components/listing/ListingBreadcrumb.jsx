import React from "react";
import { Breadcrumb } from "react-bootstrap";
import cities from "../../data/cities";
import categories from "../../data/categories";
import { isDefined } from "../../utils/null-checks";

const ListingBreadcrumb = ({ listing }) => {
  const location = cities.find((city) => city.value === listing.location);

  let found;
  for (let i = 0; i < categories.length; i += 1) {
    found = categories[i].options.find(
      (option) => option.value === listing.category
    );

    if (isDefined(found)) break;
  }

  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item active>{location.label}</Breadcrumb.Item>
      <Breadcrumb.Item active>{found.label}</Breadcrumb.Item>
      <Breadcrumb.Item active>{listing.title}</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default ListingBreadcrumb;
