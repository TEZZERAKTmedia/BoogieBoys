import React, { useEffect, useRef } from 'react';

const GoogleAds = () => {
  const adRef = useRef(null);

  useEffect(() => {
    const adElement = adRef.current;

    // Check if the ad has already been rendered
    if (adElement && !adElement.getAttribute('data-ad-status')) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adElement.setAttribute('data-ad-status', 'done'); // Mark as rendered
      } catch (e) {
        console.error('AdSense push error:', e);
      }
    }
  }, []);

  return (
    <div style={{ margin: '1rem 0', textAlign: 'center' }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-6576065685482347"
        data-ad-slot="3109766104"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default GoogleAds;
