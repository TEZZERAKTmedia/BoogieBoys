import React from 'react';
import './Home.css';

function BusinessAddress() {
  const address = "12840 Holly St. Unit 120, Thornton, CO 80602, United States";
  const encodedAddress = encodeURIComponent(address);
  const appleMapsUrl = `http://maps.apple.com/?q=${encodedAddress}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  // Check if the device is iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const mapsUrl = isIOS ? appleMapsUrl : googleMapsUrl;

  return (
    <address className="address">
      <a 
        href={mapsUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className='address-link'
      >
        12840 Holly St.<br /> Unit 120<br />
        Thornton, CO 80602<br />
        United States
      </a>
    </address>
  );
}

export default BusinessAddress;
