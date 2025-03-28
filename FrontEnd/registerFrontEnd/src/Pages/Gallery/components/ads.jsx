import { useEffect, useRef } from 'react';

const GoogleAdTest = () => {
  const adRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (window.adsbygoogle && adRef.current) {
        try {
          console.log('Ad is visible?', adRef.current?.offsetParent !== null);

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
        data-ad-client="ca-pub-6576065685482347"
        data-ad-slot="2657816874"
        data-ad-format="auto"
      ></ins>
    </div>
  );
};

export default GoogleAdTest;
