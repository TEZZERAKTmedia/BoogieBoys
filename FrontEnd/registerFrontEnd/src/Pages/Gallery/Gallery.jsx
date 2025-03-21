import React, { useState, useEffect } from 'react';
import CategoryMenu from './GalleryMenu';
import ImageModal from './ImageModal';
import './GalleryPage.css';

// Your custom categories — these should match your folder names
const categories = [
  'All',
  'Abstract Black',
  'Fine Linework',
  'Micro Realism',
  'Dotwork',
];

// Vite dynamic import: gets all images from subfolders in /assets
const allImages = import.meta.glob('../../assets/*/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

// Helper to extract folder name (i.e. category) from file path
const getCategoryFromPath = (path) => {
  const parts = path.split('/');
  return parts.length > 2 ? decodeURIComponent(parts[parts.length - 2]) : 'Unknown';
};

// Convert imported files to an array of { src, category }
const imageData = Object.entries(allImages)
  .map(([path, src]) => ({ src, category: getCategoryFromPath(path) }))
  .filter((img) => img.src && img.category);

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filteredImages, setFilteredImages] = useState(imageData);
  const [selectedImage, setSelectedImage] = useState(null);

  // Update filtered images when selectedCategory changes
  useEffect(() => {
    const updatedImages =
      selectedCategory === 'All'
        ? imageData
        : imageData.filter((img) => img.category === selectedCategory);
    setFilteredImages(updatedImages);
  }, [selectedCategory]);

  // Handle category selection and close the modal
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setIsMenuOpen(false);
  };

  return (
    <div className="gallery-page">
      {/* Modal for Category Menu */}
      {isMenuOpen && (
        <div className="modal">
          <div className="modal-content">
            <CategoryMenu
              categoriesProp={categories}
              selected={selectedCategory}
              onSelect={handleSelectCategory}
            />
            <button className="close-modal-btn" onClick={() => setIsMenuOpen(false)}>
              Close Menu
            </button>
          </div>
        </div>
      )}

      {/* Grid of Images */}
      <div className="image-grid">
        {filteredImages.map((img, i) => {
          const keyPart = `${img.category}-${img.src}-${i}`;
          return (
            <img
              key={keyPart}
              src={img.src}
              alt={img.category}
              className="grid-image"
              loading="lazy"
              onClick={()=> setSelectedImage(img)}
            />
          );
        })}
      </div>
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}

      {/* Floating Menu Button */}
      <button className="floating-menu-btn" onClick={() => setIsMenuOpen(true)}>
        Menu
      </button>
    </div>
  );
};

export default GalleryPage;
