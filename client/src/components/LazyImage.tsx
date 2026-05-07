import { useEffect, useRef, useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
  onLoad?: () => void;
}

/**
 * 懶加載圖片組件 - 優化頁面加載性能
 * 使用 Intersection Observer API 實現圖片懶加載
 */
export function LazyImage({
  src,
  alt,
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3C/svg%3E',
  className = '',
  onLoad,
}: LazyImageProps) {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imgRef.current) {
            // 當圖片進入視口時，加載真實圖片
            const img = new Image();
            img.onload = () => {
              setImageSrc(src);
              setIsLoaded(true);
              onLoad?.();
            };
            img.onerror = () => {
              // 加載失敗時保持佔位符
              console.error(`Failed to load image: ${src}`);
            };
            img.src = src;
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px', // 提前 50px 加載
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src, onLoad]);

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-75'} transition-opacity duration-300`}
      loading="lazy"
    />
  );
}
