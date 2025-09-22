import React from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({ src, alt, className = '' }) => (
  <img 
    src={src} 
    alt={alt}
    className={`card-img-top ${className}`}
    style={{ height: '200px', objectFit: 'cover' }}
  />
);