import React, { useEffect } from 'react';

const GoogleAds = () => {
  useEffect(() => {
    // Reinitialize the ad when the component mounts or updates
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('Adsense error:', e);
    }
  }, []);

  return (
    <div style={{ margin: '1rem 0', textAlign: 'center' }}>
      {/* Replace the values below with your snippet */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-6576065685482347"  
        data-ad-slot="3109766104"                 
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default GoogleAds;
