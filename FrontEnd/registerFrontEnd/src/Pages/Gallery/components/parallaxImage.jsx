import React from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';

const ParallaxImage = ({ src, alt, factor, ...props }) => {
  const { scrollY } = useViewportScroll();
  // Increase the effect by scaling the factor (adjust multiplier as needed)
  const y = useTransform(scrollY, [0, 500], [0, factor * 1.5]);

  return (
    <motion.img
      src={src}
      alt={alt}
      style={{ y }}
      // Loading in animation: start faded and slightly smaller,
      // then animate to full opacity and scale
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="grid-image"
      loading="lazy"
      {...props}
    />
  );
};

export default ParallaxImage;
