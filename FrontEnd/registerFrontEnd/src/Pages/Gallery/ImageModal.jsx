import React from 'react';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaPinterestP, 
  FaWhatsapp, 
  FaInstagram, 
  FaSnapchatGhost 
} from 'react-icons/fa';
import GoogleAds from './components/ads';
import './ImageModal.css';

const ImageModal = ({ image, onClose, onNext, onPrev, hasNext, hasPrev }) => {
  if (!image) return null;

  const shareUrl = window.location.href;
  const shareText = encodeURIComponent("Check out this image!");

  return (
    <div className="gallery-modal-overlay" onClick={onClose}>
      <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="gallery-modal-close" onClick={onClose}>
          X
        </button>

        {/* Navigation Arrows */}
        <div className="gallery-modal-navigation">
          {hasPrev && (
            <button className="gallery-modal-arrow left" onClick={onPrev} aria-label="Previous image">
              &lsaquo;
            </button>
          )}
          {hasNext && (
            <button className="gallery-modal-arrow right" onClick={onNext} aria-label="Next image">
              &rsaquo;
            </button>
          )}
        </div>

        <img
          src={image.src}
          alt={image.alt || "Image"}
          className="gallery-modal-image"
        />
        <div className="gallery-modal-share">
          {/* Facebook */}
          <button
            onClick={() =>
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                '_blank'
              )
            }
            aria-label="Share on Facebook"
          >
            <FaFacebookF size={24} />
          </button>
          {/* Twitter */}
          <button
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareText}`,
                '_blank'
              )
            }
            aria-label="Share on Twitter"
          >
            <FaTwitter size={24} />
          </button>
          {/* LinkedIn */}
          <button
            onClick={() =>
              window.open(
                `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}`,
                '_blank'
              )
            }
            aria-label="Share on LinkedIn"
          >
            <FaLinkedinIn size={24} />
          </button>
          {/* Pinterest */}
          <button
            onClick={() =>
              window.open(
                `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(image.src)}&description=${shareText}`,
                '_blank'
              )
            }
            aria-label="Share on Pinterest"
          >
            <FaPinterestP size={24} />
          </button>
          {/* WhatsApp */}
          <button
            onClick={() =>
              window.open(
                `https://api.whatsapp.com/send?text=${shareText}%20${encodeURIComponent(shareUrl)}`,
                '_blank'
              )
            }
            aria-label="Share on WhatsApp"
          >
            <FaWhatsapp size={24} />
          </button>
          {/* Instagram (No direct share URL; opens Instagram homepage) */}
          <button
            onClick={() =>
              window.open('https://www.instagram.com', '_blank')
            }
            aria-label="Share on Instagram"
          >
            <FaInstagram size={24} />
          </button>
          {/* Snapchat (No direct share URL; opens Snapchat homepage) */}
          <button
            onClick={() =>
              window.open('https://www.snapchat.com', '_blank')
            }
            aria-label="Share on Snapchat"
          >
            <FaSnapchatGhost size={24} />
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
