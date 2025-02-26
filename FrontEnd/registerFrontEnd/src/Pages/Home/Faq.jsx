import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './faq.css';

const FAQAppointment = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    { question: 'How can I book an Appointment?', answer: 'You can book an appointment by clicking here.', shouldLink: true, path: '/contact' },
    { question: 'Do you allow walk-ins?', answer: 'Boogie Boys is a private studio and works by appointment only. Schedule an appointment today!', shouldLink: true, path: '/contact' },
    { question: 'Can I schedule a personal consultation?', answer: "If you'd like to schedule a personal consultation before scheduling a tattoo, please specify that when filling out a contact form. Feel free to include reference pictures in your message.",  shouldLink: true, path: '/contact' },
  ];

  return (
    <div className="faq-appointment-container">
      {/* FAQs Section */}
      <div className="faq-section">
        <h2>FAQs</h2>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <span>{activeIndex === index ? '-' : '+'}</span>
              {faq.question}
            </div>
            <div
              className={`faq-answer-wrapper ${activeIndex === index ? 'open' : ''}`}
            >
              {faq.answer && (
                <div className="faq-answer">
                  {faq.shouldLink ? (
                    <Link to={faq.path} className="faq-link">{faq.answer}</Link> // Conditionally render link
                  ) : (
                    faq.answer // Render plain text
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Appointment Section */}
      <div className="appointment-section">
        <h2>Schedule an appointment</h2>
        <hr />
        <Link to="/contact" className="book-button">Book Now</Link>
        <div className="social-section">
          <p>FOLLOW US</p>
          <div className="social-icons">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              {/* Add Instagram Icon Here */}
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
              {/* Add TikTok Icon Here */}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQAppointment;
