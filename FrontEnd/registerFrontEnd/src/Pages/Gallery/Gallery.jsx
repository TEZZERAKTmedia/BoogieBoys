import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CategoryMenu from './GalleryMenu';
import ImageModal from './ImageModal';
import ParallaxImage from './components/parallaxImage';
import './GalleryPage.css';

const categories = [
  'All',
  'Abstract Black',
  'Fine Linework',
  'Micro Realism',
  'Dotwork',
];

const allImages = import.meta.glob('../../assets/*/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

const getCategoryFromPath = (path) => {
  const parts = path.split('/');
  return parts.length > 2 ? decodeURIComponent(parts[parts.length - 2]) : 'Unknown';
};

const imageData = Object.entries(allImages)
  .map(([path, src]) => ({ src, category: getCategoryFromPath(path) }))
  .filter((img) => img.src && img.category);

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filteredImages, setFilteredImages] = useState(imageData);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const updatedImages =
      selectedCategory === 'All'
        ? imageData
        : imageData.filter((img) => img.category === selectedCategory);
    setFilteredImages(updatedImages);
    setSelectedImageIndex(null);

    const params = new URLSearchParams(location.search);
    const imageParam = params.get('image');

    if (imageParam) {
      const index = updatedImages.findIndex((img) =>
        img.src.includes(decodeURIComponent(imageParam))
      );
      if (index !== -1) {
        setSelectedImageIndex(index);
      }
    }
  }, [selectedCategory, location.search]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNext = () => {
    setSelectedImageIndex((prevIndex) => {
      const nextIndex = prevIndex < filteredImages.length - 1 ? prevIndex + 1 : prevIndex;
      const nextImage = filteredImages[nextIndex];
      if (nextImage) {
        const imageName = encodeURIComponent(nextImage.src.split('/').pop());
        navigate(`?image=${imageName}`, { replace: false });
      }
      return nextIndex;
    });
  };

  const handlePrev = () => {
    setSelectedImageIndex((prevIndex) => {
      const prevIndexUpdated = prevIndex > 0 ? prevIndex - 1 : prevIndex;
      const prevImage = filteredImages[prevIndexUpdated];
      if (prevImage) {
        const imageName = encodeURIComponent(prevImage.src.split('/').pop());
        navigate(`?image=${imageName}`, { replace: false });
      }
      return prevIndexUpdated;
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const parallaxFactors = useMemo(
    () => filteredImages.map(() => Math.random() * 60 - 30),
    [filteredImages]
  );

  return (
    <div className="gallery-page">
      {isMenuOpen && (
        <div className="modal">
          <div className="modal-content">
            <CategoryMenu
              categoriesProp={categories}
              selected={selectedCategory}
              onSelect={(category) => {
                setSelectedCategory(category);
                setIsMenuOpen(false);
              }}
            />
            <button className="close-modal-btn" onClick={() => setIsMenuOpen(false)}>
              Close Menu
            </button>
          </div>
        </div>
      )}

      <div className="image-grid">
        {filteredImages.map((img, i) => {
          const keyPart = `${img.category}-${img.src}-${i}`;
          return (
            <ParallaxImage
              key={keyPart}
              src={img.src}
              alt={img.category}
              factor={parallaxFactors[i]}
              onClick={() => {
                setSelectedImageIndex(i);
                const imageName = encodeURIComponent(img.src.split('/').pop());
                navigate(`?image=${imageName}`, { replace: false });
              }}
            />
          );
        })}
      </div>

      {selectedImageIndex !== null && (
        <ImageModal
          image={filteredImages[selectedImageIndex]}
          onClose={() => {
            setSelectedImageIndex(null);
            navigate('', { replace: true });
          }}
          onNext={handleNext}
          onPrev={handlePrev}
          hasNext={selectedImageIndex < filteredImages.length - 1}
          hasPrev={selectedImageIndex > 0}
        />
      )}

      <button className="floating-menu-btn" onClick={() => setIsMenuOpen(true)}>
        Menu
      </button>

      {showBackToTop && (
        <button className="back-to-top-btn" onClick={scrollToTop}>
          Back to Top
        </button>
      )}
    </div>
  );
};

export default GalleryPage;