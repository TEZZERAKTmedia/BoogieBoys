import React from 'react';

const Shop = () => {
  return (
    <div style={{ width: '100%', height: '80vh', marginTop: '20%'}}>
      <h1></h1>
      <iframe
        src="https://boogieboys.creator-spring.com" // Replace with your shop URL
        title="Embedded Shop"
        style={{
          width: '100%',
          height: '90vh',
          border: 'none',
          borderRadius: '10px',
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
};

export default Shop;
