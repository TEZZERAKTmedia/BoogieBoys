import React from 'react';
import './GalleryPage.css'; // Assuming you keep all CSS together

const CategoryMenu = ({ categoriesProp, selected, onSelect }) => {
  const categories = categoriesProp || [
    'All',
    'Abstract Black',
    'Fine Linework',
    'Micro Realism',
    'Dotwork',
  ];

  return (
    <div className="category-menu">
      {categories.map((category, index) => {
        const trimmedCategory = category.trim();
        const uniqueKey = `${trimmedCategory}-${index}`;
        return (
          <button
            key={uniqueKey}
            onClick={() => onSelect(trimmedCategory)}
            className={`category-button ${selected === trimmedCategory ? 'selected' : ''}`}
          >
            {trimmedCategory}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryMenu;
