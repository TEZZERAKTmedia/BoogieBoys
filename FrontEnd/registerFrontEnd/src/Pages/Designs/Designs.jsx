import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FAQAppointment from '../Home/Faq';
import './designs.css';

import D1 from '../../assets/design-1.png';
import D2 from '../../assets/design-2.png';
import D3 from '../../assets/design-3.png';

const Home = () => {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start end", "end start"],
  });
  const [selectedImage, setSelectedImage] = useState(null);

  // When an image is clicked, store it in state.
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // When "Inquire" is clicked, navigate to /contact and pass the image.
  const handleInquire = (e) => {
    e.stopPropagation(); // Prevent the click from bubbling up
    navigate('/contact', { state: { attachedImage: selectedImage } });
  };

  return (
    <div ref={scrollContainerRef} className="scroll-container-designs">
      <motion.section className="gallery-grid-designs">
        {[D1, D2, D3].map((image, index) => {
          const imageParallax = useTransform(
            scrollYProgress,
            [0, 1],
            [index % 2 === 0 ? -30 : 30, index % 2 === 0 ? 30 : -30]
          );
          return (
            <div 
              key={index} 
              className="gallery-item-container" 
              onClick={() => handleImageClick(image)}
            >
              <motion.img
                src={image}
                alt={`Gallery Image ${index + 1}`}
                className="gallery-item"
                style={{ y: imageParallax }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              {selectedImage === image && (
                <div className="overlay" onClick={(e) => e.stopPropagation()}>
                  <button 
                    className="inquire-button" 
                    onClick={handleInquire}
                  >
                    Inquire
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="home-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <FAQAppointment />
      </motion.section>
    </div>
  );
};

export default Home;
