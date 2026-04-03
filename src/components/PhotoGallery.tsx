import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// ============================================================================
// PHOTO GALLERY with Lightbox
// Features:
// - Hover zoom effect on images
// - Click to open fullscreen lightbox
// - Navigate between images with arrows or keyboard
// - Close with X button, click outside, or Escape key
// ============================================================================

export interface GalleryImage {
  src: string;
  alt: string;
  className?: string;
  objectFit?: "cover" | "contain";
  bgColor?: string;
}

interface PhotoGalleryProps {
  images: GalleryImage[];
  className?: string;
  gridClassName?: string;
}

export function PhotoGallery({ images, className = "", gridClassName = "grid grid-cols-2" }: PhotoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, goToPrevious, goToNext]);

  return (
    <>
      {/* Gallery Grid */}
      <div className={`${gridClassName} ${className}`}>
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className={`relative overflow-hidden cursor-pointer group ${image.className || ""}`}
            style={image.bgColor ? { backgroundColor: image.bgColor } : undefined}
            aria-label={`View ${image.alt} in fullscreen`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className={`w-full h-full transition-transform duration-500 ease-out group-hover:scale-110 ${
                image.objectFit === "contain" ? "object-contain" : "object-cover"
              }`}
              loading="lazy"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>

          {/* Image counter */}
          <div className="absolute top-4 left-4 text-white/50 text-sm font-light">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={48} />
          </button>

          {/* Current image */}
          <div
            className="max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={48} />
          </button>

          {/* Image caption */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-light text-center max-w-lg px-4">
            {images[currentIndex].alt}
          </div>
        </div>
      )}
    </>
  );
}

// ============================================================================
// CAPTIONED PHOTO GALLERY - Masonry style with text overlays
// Like Crawfurd Hill site - images with title/description at bottom
// ============================================================================

export interface CaptionedImage {
  src: string;
  title: string;
  description: string;
  className?: string;
  span?: "normal" | "tall" | "wide";
  url?: string;
}

interface CaptionedPhotoGalleryProps {
  images: CaptionedImage[];
  className?: string;
}

export function CaptionedPhotoGallery({ images, className = "" }: CaptionedPhotoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, goToPrevious, goToNext]);

  const getSpanClass = (span?: string) => {
    switch (span) {
      case "tall":
        return "row-span-2";
      case "wide":
        return "col-span-2";
      default:
        return "";
    }
  };

  const renderImageContent = (image: CaptionedImage) => (
    <>
      {/* Image */}
      <img
        src={image.src}
        alt={image.title}
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        loading="lazy"
      />

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Caption overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
        <h3 className="text-white font-bold text-sm md:text-base leading-tight mb-1">
          {image.title}
        </h3>
        <p className="text-white/70 text-xs md:text-sm leading-relaxed">
          {image.description}
        </p>
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
    </>
  );

  return (
    <>
      {/* Masonry-style Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
        {images.map((image, index) =>
          image.url ? (
            <a
              key={index}
              href={image.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative overflow-hidden cursor-pointer group block aspect-[4/3] ${getSpanClass(image.span)} ${image.className || ""}`}
              aria-label={`Read more about ${image.title}`}
            >
              {renderImageContent(image)}
            </a>
          ) : (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className={`relative overflow-hidden cursor-pointer group aspect-[4/3] ${getSpanClass(image.span)} ${image.className || ""}`}
              aria-label={`View ${image.title} in fullscreen`}
            >
              {renderImageContent(image)}
            </button>
          )
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>

          <div className="absolute top-4 left-4 text-white/50 text-sm font-light">
            {currentIndex + 1} / {images.length}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={48} />
          </button>

          <div
            className="max-w-[90vw] max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].title}
              className="max-w-full max-h-[85vh] object-contain"
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={48} />
          </button>

          {/* Caption in lightbox */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center max-w-2xl px-4">
            <h3 className="text-white font-bold text-lg mb-1">
              {images[currentIndex].title}
            </h3>
            <p className="text-white/70 text-sm">
              {images[currentIndex].description}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

// Single clickable image with hover zoom (for use outside the gallery grid)
export function ClickableImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  return (
    <>
      <button
        onClick={() => setLightboxOpen(true)}
        className={`relative overflow-hidden cursor-pointer group ${className}`}
        aria-label={`View ${alt} in fullscreen`}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </button>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={32} />
          </button>

          <div
            className="max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-light text-center max-w-lg px-4">
            {alt}
          </div>
        </div>
      )}
    </>
  );
}
