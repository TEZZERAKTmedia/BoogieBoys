import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTiktok } from 'react-icons/fa'; // Import icons
import './faq.css';

const FAQAppointment = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    { question: 'How can I book an Appointment?', answer: 'You can book an appointment by clicking here.', shouldLink: true, path: '/contact' },
    { question: 'How do you handle personal information?', answer: "Boogie Boys uses top of line, industry leading, HIPAA regulated intake forms to keep you personal information safe.", shouldLink: true, path: '/contact' },
    { question: 'Do you allow walk-ins?', answer: 'Boogie Boys is a private studio and works by appointment only. Schedule an appointment today!', shouldLink: true, path: '/privacy' },
    { question: 'Can I schedule a personal consultation?', answer: "If you'd like to schedule a personal consultation before scheduling a tattoo, please specify that when filling out a contact form. Feel free to include reference pictures in your message.", shouldLink: true, path: '/contact' },
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
                    <Link to={faq.path} className="faq-link">{faq.answer}</Link>
                  ) : (
                    faq.answer
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

        {/* Social Media Section */}
        <div className="social-section">
          <p>FOLLOW US</p>
          <div className="social-icons">
            <a href="https://www.instagram.com/xboogieboysx/?hl=en" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={30}  />
            </a>
            <a href="https://www.tiktok.com/@boogieboys" target="_blank" rel="noopener noreferrer">
              <FaTiktok size={30}  />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQAppointment;
