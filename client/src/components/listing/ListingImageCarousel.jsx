import React from "react";
import ImageGallery from "react-image-gallery";

function ListingImageCarousel({ imgs }) {
  const images = Array.from(imgs, (img) => {
    return {
      original: `/${img.filePath}`,
      thumbnail: `/${img.filePath}`,
    };
  });

  return <ImageGallery items={images} showPlayButton={false} />;
}

export default ListingImageCarousel;
