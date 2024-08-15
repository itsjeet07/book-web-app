import React, { useState } from 'react';
import noImage from '@/assets/noimage.png';

interface ImageContainerProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  fallbackSrc?: string;
}

const ImageContainer: React.FC<ImageContainerProps> = ({
  src,
  alt,
  className,
  fallbackSrc = noImage
}) => {
  const [imageSrc, setImageSrc] = useState<string>(src);

  const handleError = () => {
    setImageSrc(fallbackSrc);
  };

  return (
    <div className={`img-container ${className}`}>
      <img src={imageSrc} alt={alt} onError={handleError} />
    </div>
  );
};

export default ImageContainer;
