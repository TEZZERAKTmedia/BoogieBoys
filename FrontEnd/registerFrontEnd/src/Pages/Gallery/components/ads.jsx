import { useEffect, useRef } from 'react';

const GoogleAdTest = () => {
  const adRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (window.adsbygoogle && adRef.current) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          console.log('✅ Ad pushed after delay');
        } catch (e) {
          console.error('❌ Ad push error:', e);
        }
      }
    }, 500); // Delay push to allow animations to complete

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div style={{ textAlign: 'center', border: '2px dashed green', padding: '20px' }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '300px', height: '250px' }}
        data-ad-client="ca-pub-3940256099942544"
        data-ad-slot="6300978111"
        data-adtest="on"
      ></ins>
    </div>
  );
};

export default GoogleAdTest;
