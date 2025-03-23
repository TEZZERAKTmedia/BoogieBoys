import React, { useEffect } from 'react';

const GoogleAds = () => {
  useEffect(() => {
    console.log("GoogleAds Component Mounted");

    // Check if window.adsbygoogle is available
    if (!window.adsbygoogle) {
      console.warn("adsbygoogle is not present on window — the script may not have loaded yet.");
    } else {
      console.log("adsbygoogle is present, pushing ad initialization...");
    }

    // Try to initialize the ad
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      console.log("adsbygoogle.push({}) called successfully.");
    } catch (e) {
      console.error("Adsense error:", e);
    }
  }, []);

  return (
    <div style={{ margin: '1rem 0', textAlign: 'center' }}>
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
