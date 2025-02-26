import React from 'react';
import { Flipped } from 'react-flip-toolkit';

const FlipCard = ({ slide, index }) => (
  <Flipped flipId={`card-${index}`} stagger>
    <div className="card">
      <div className="card-inner">
        <div className="card-front">
          <img src={slide.image} alt={`Slide ${index + 1}`} className="slide-image" />
        </div>
        <div className="card-back">
          <div className="slide-text">{slide.text}</div>
        </div>
      </div>
    </div>
  </Flipped>
);

export default FlipCard;
