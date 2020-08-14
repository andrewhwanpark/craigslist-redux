import React from "react";
import { Carousel } from "react-bootstrap";

function ListingImageCarousel({ imgs }) {
  return (
    <Carousel>
      {imgs.map((img, idx) => (
        <Carousel.Item key={idx}>
          <img
            className="d-block w-100"
            src={`http://localhost:5000/${img.filePath}`}
            alt="product photos"
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ListingImageCarousel;
