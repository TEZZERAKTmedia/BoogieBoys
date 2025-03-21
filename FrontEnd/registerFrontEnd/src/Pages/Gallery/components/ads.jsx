import React, { useEffect } from 'react';

const GoogleAds = () => {
  useEffect(() => {
    // Create script element for the AdSense library
    const script = document.createElement('script');
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7423019880380547";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    // Clean up the script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // When the component mounts or updates, push the adsbygoogle command.
    // This initializes the ad in the <ins> tag.
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('Adsense error:', e);
    }
  });

  return (
    <div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-7423019880380547"
        data-ad-slot="YOUR_AD_SLOT_ID" // Replace with your specific ad slot ID
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default GoogleAds;
