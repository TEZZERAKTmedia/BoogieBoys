import React, { useState, useEffect } from 'react';
import './aftercare.css';
import WashGif from '../assets/Wash.gif';
import SoapGif from '../assets/Soap.gif';
import AquaphorGif from '../assets/Aquaphor.gif';
import AirGif from '../assets/Air.gif';
import DontScratchGif from '../assets/Dont-Scratch.gif';
import SunGif from '../assets/Sun.gif';

const slides = [
  { image: WashGif, text: 'Wash your hands before touching your tattoo.' },
  { image: SoapGif, text: 'Wash with antibacterial soap and pat dry.' },
  { image: AquaphorGif, text: 'Apply ointment recommended by your tattoo artist.' },
  { image: AirGif, text: 'Let your tattoo breathe.' },
  { image: DontScratchGif, text: 'DON’T pick or itch your tattoo.' },
  { image: SunGif, text: 'Avoid prolonged sun exposure and always apply SPF.' },
];

const TutorialSlideshow = () => {
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [showButton, setShowButton] = useState(false);

  // Set up an interval to show the back button every 20 seconds.
  useEffect(() => {
    const interval = setInterval(() => {
      setShowButton(true);
      // Hide the button after 7 seconds (adjust this value if needed)
      setTimeout(() => {
        setShowButton(false);
      }, 7000);
    }, 7000); // Every 20 seconds

    return () => clearInterval(interval);
  }, []);

  const handleClick = (index) => {
    setFlippedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="title">Tattoo Aftercare</h1>
      </header>
      <div className="tutorial-grid">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`card ${flippedIndices.includes(index) ? 'flipped' : ''}`}
            style={{ '--card-index': index }}
            onClick={() => handleClick(index)}
          >
            <div className="card-inner">
              <div className="card-front">
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="slide-image"
                />
                <div className="slide-number">{index + 1}</div>
              </div>
              <div className="card-back">
                <div className="slide-number">{index + 1}</div>
                <div className="slide-text">{slide.text}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showButton && (
        <a
          href="https://boogieboys.one"
          className="back-button"
          aria-label="Back to BoogieBoys"
        >
          <span className="back-button-text">Back to BoogieBoys</span>
        </a>
      )}
    </div>
  );
};

export default TutorialSlideshow;
