import React from 'react';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaPinterestP, 
  FaWhatsapp, 
  FaInstagram, 
  FaSnapchatGhost,
  FaShareAlt  // Icon for native share button
} from 'react-icons/fa';
import GoogleAds from './components/ads';
import './ImageModal.css';

const ImageModal = ({ image, onClose, onNext, onPrev, hasNext, hasPrev }) => {
  if (!image) return null;

  const shareUrl = window.location.href;
  const shareText = encodeURIComponent("Check out this image!");

  // Function to share the actual image file using the Web Share API
  const handleNativeShare = async () => {
    try {
      const response = await fetch(image.src);
      const blob = await response.blob();
      // Use a proper filename and mime type for the shared file
      const file = new File([blob], 'shared-image.webp', { type: blob.type });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Check out this image!',
          text: 'Check out this image!',
          url: shareUrl,
        });
      } else {
        alert('Your device does not support sharing files.');
      }
    } catch (error) {
      console.error('Error sharing the image file:', error);
      alert('Error sharing the image.');
    }
  };

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
          {/* Instagram (opens Instagram homepage) */}
          <button
            onClick={() =>
              window.open('https://www.instagram.com', '_blank')
            }
            aria-label="Share on Instagram"
          >
            <FaInstagram size={24} />
          </button>
          {/* Snapchat (opens Snapchat homepage) */}
          <button
            onClick={() =>
              window.open('https://www.snapchat.com', '_blank')
            }
            aria-label="Share on Snapchat"
          >
            <FaSnapchatGhost size={24} />
          </button>
          {/* Native Share (using Web Share API) */}
          <button onClick={handleNativeShare} aria-label="Native Share">
            <FaShareAlt size={24} />
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
