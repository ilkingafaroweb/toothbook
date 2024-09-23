import React from 'react';

interface ResponsiveImageProps {
  desktopSrc: string;
  mobileSrc: string;
  altText: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({ desktopSrc, mobileSrc, altText }) => {
  return (
    <div className="w-full h-auto">
      {/* Desktop Image */}
      <img
        src={desktopSrc}
        alt={altText}
        className="hidden md:block w-full h-full"
      />
      {/* Mobile Image */}
      <img
        src={mobileSrc}
        alt={altText}
        className="block md:hidden w-full h-auto"
      />
    </div>
  );
};
