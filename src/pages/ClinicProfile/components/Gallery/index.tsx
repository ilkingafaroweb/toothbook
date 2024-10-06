import React from "react";

interface ClinicGalleryProps {
  images: string[];
}

export const Gallery: React.FC<ClinicGalleryProps> = ({ images }) => {
  

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
            />
          </div>
        ))}
      </div>
    </div>
  );
};