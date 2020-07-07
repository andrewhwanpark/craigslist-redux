import React from "react";
import { Carousel } from "react-bootstrap";

function ListingImageCarousel({ imgs }) {
  return (
    <Carousel>
      {imgs.map((img) => (
        <Carousel.Item>
          <img className="d-block w-100" src={img} alt="product photos"/>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ListingImageCarousel;
