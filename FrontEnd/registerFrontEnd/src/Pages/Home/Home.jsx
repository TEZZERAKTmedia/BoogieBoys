import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Home.css';
import FAQAppointment from './Faq';
import Headshot from '../../assets/Jonny.webp';
import P1 from '../../assets/1-paralax.webp';
import P2 from '../../assets/2-paralax.webp';
import G1 from '../../assets/1x6.webp';
import G2 from '../../assets/2x6.webp';
import G3 from '../../assets/3x6.webp';
import G4 from '../../assets/4x6.webp';
import G5 from '../../assets/5x6.webp';
import G6 from '../../assets/6x6.webp';
import Address from './address';

const Home = () => {
  const scrollContainerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start end", "end start"],
  });

  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <div ref={scrollContainerRef} className="scroll-container">
      {/* Hero Section */}
      <motion.section
        className="hero-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-content" >
          <motion.img
            style={{ y: parallaxY1 }}
            className="Headshot"
            src={Headshot}
            alt="Headshot"
          />
          <h1 className="hero-title">Quality and Precision</h1>
          <p className="hero-description">
            Every tattoo from jonny.tatu is done with a specialized single needle ensuring that our clients get the finest lines and the highest precision.
          </p>
          <Address />
              
          <Link to="/contact" className="hero-btn">
           Schedule an Appointment
          </Link>
        </div>
      </motion.section>
      
      {/* Parallax Section */}
      <motion.section className="parallax-section">
        <motion.img
          style={{ y: parallaxY1 }}
          className="parallax-image"
          src={P1}
          alt="Parallax 1"
        />
        <motion.img
          style={{ y: parallaxY2 }}
          className="parallax-image"
          src={P2}
          alt="Parallax 2"
        />
      </motion.section>

      {/* Gallery Section */}
      <motion.section className="gallery-grid">
        {[G1, G2, G3, G4, G5, G6].map((image, index) => {
          const imageParallax = useTransform(
            scrollYProgress,
            [0, 1],
            [index % 2 === 0 ? -30 : 30, index % 2 === 0 ? 30 : -30]
          );
          return (
            <motion.img
              key={index}
              src={image}
              alt={`Gallery Image ${index + 1}`}
              className="gallery-item"
              style={{ y: imageParallax }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
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
