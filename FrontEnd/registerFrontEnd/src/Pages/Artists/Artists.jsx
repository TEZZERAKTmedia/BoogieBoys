import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Jonny from "../../assets/Jonny-artist.png";
import Joel from "../../assets/Joel-artist.png";
import "./artists.css";

const Artist = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax depth for each artist card
  const parallax1 = useTransform(scrollYProgress, [0, 1], ["-50px", "40px"]);
  const parallax2 = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);
  const parallax3 = useTransform(scrollYProgress, [0, 1], ["-30px", "30px"]);

  return (
    <div className="artist-page" ref={containerRef}>
      <div className="artist-grid">
        {/* Artist 1 */}
        <motion.div className="artist-card" style={{ y: parallax1 }}>
          <a
            href="https://www.instagram.com/jonny.tatu/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Jonny} alt="Jonny Tatu" />
            <p>@Jonny.tatu</p>
          </a>
        </motion.div>

        {/* Artist 2 */}
        <motion.div className="artist-card" style={{ y: parallax2 }}>
          <a
            href="https://www.instagram.com/medeaner_tattoos/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Joel} alt="Joel Medeaner" />
            <p>@medeaner_tattoos</p>
          </a>
        </motion.div>

        {/* Placeholder for Future Artist */}
        <motion.div className="artist-card" style={{ y: parallax3 }}>
          <img src="" alt="Coming Soon" />
        </motion.div>
      </div>
    </div>
  );
};

export default Artist;
