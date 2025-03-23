// GoogleAds.jsx
import React, { useEffect, useRef } from 'react';

function GoogleAds() {
  const initializedRef = useRef(false);

  useEffect(() => {
    // If we've never initialized this ad before...
    if (!initializedRef.current && window.adsbygoogle) {
      console.log('[GoogleAds] Initializing ad...');
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      initializedRef.current = true;
    } else {
      console.log('[GoogleAds] Ad already initialized or adsbygoogle missing');
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-XXXX"
      data-ad-slot="XXXX"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}

export default GoogleAds;
