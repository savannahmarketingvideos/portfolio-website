import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  className?: string;
  wrapperClassName?: string;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      className={`relative overflow-hidden ${wrapperClassName}`}
      style={{ 
        backgroundColor: '#1a1a1a',
      }}
    >
      {!isLoaded && !priority && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/80">
          <div className="w-8 h-8 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        priority={priority}
        onLoad={() => setIsLoaded(true)}
        className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        {...props}
      />
    </div>
  );
}