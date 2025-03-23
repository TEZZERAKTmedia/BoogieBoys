import React, { useEffect, useRef } from 'react';

const GoogleAds = () => {
  const adRef = useRef(null);

  useEffect(() => {
    const pushAd = () => {
      try {
        if (window.adsbygoogle && adRef.current) {
          console.log('Pushing AdSense ad');
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (e) {
        console.error('AdSense push error:', e);
      }
    };

    // If the script is already loaded, push ad
    if (window.adsbygoogle) {
      pushAd();
    } else {
      // Wait for script to load before pushing
      const interval = setInterval(() => {
        if (window.adsbygoogle) {
          clearInterval(interval);
          pushAd();
        }
      }, 300);
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
      ></ins>
    </div>
  );
};

export default GoogleAds;
