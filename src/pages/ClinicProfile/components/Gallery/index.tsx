import React, { useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

interface ClinicGalleryProps {
  images: string[];
}

export const Gallery: React.FC<ClinicGalleryProps> = ({ images }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [photoIndex, setPhotoIndex] = useState<number>(0);

  const handleOpenLightbox = (index: number) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  return (
    <div className="min-w-full">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-auto object-cover cursor-pointer rounded-lg"
              onClick={() => handleOpenLightbox(index)}
            />
          </div>
        ))}
      </div>

      {/* Lightbox for Fullscreen Viewing and Navigation */}
      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}
    </div>
  );
};