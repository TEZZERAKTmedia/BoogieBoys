import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import GoogleAds from './components/ads';
import './ImageModal.css';

const ImageModal = ({ image, onClose }) => {
  if (!image) return null;

  const shareUrl = window.location.href;
  const shareText = encodeURIComponent("Check out this image!");

  return (
    <div className="gallery-modal-overlay" onClick={onClose}>
      <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="gallery-modal-close" onClick={onClose}>
          &times;
        </button>
        <img
          src={image.src}
          alt={image.alt || "Image"}
          className="gallery-modal-image"
        />
        <div className="gallery-modal-share">
          <button
            onClick={() =>
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  shareUrl
                )}`,
                '_blank'
              )
            }
            aria-label="Share on Facebook"
          >
            <FaFacebookF size={24} />
          </button>
          <button
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  shareUrl
                )}&text=${shareText}`,
                '_blank'
              )
            }
            aria-label="Share on Twitter"
          >
            <FaTwitter size={24} />
          </button>
          <button
            onClick={() =>
              window.open(
                `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                  shareUrl
                )}`,
                '_blank'
              )
            }
            aria-label="Share on LinkedIn"
          >
            <FaLinkedinIn size={24} />
          </button>
        </div>
        <div className="gallery-modal-ad">
          <GoogleAds />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
