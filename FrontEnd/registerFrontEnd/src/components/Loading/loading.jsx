// src/components/LoadingPage.js
import React, { useState, useEffect } from 'react';
import loadingAnimation from '../../assets/Loading.gif';
import './loading-page.css';

const messages = [
  "Building email...",
  "Attaching files...",
  "Sending to Boogie Boys...",
  "Almost there...",
  "Finalizing..."
];

const LoadingPage = () => {
  const [currentMessage, setCurrentMessage] = useState(messages[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setCurrentMessage(messages[index]);
    }, 4000); // Change message every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-page">
      <div className="loading-section">
        <img className="animation" src={loadingAnimation} alt="Loading animation" />
        <p>{currentMessage}</p>
        <div className="progress-bar">
          <div className="progress-indicator"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
