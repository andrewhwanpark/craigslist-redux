import React from "react";
import ImageGallery from "react-image-gallery";

function ListingImageCarousel({ imgs }) {
  const images = Array.from(imgs, (img) => {
    return {
      original: `http://localhost:5000/${img.filePath}`,
      thumbnail: `http://localhost:5000/${img.filePath}`,
    };
  });

  return <ImageGallery items={images} showPlayButton={false} />;
}

export default ListingImageCarousel;
