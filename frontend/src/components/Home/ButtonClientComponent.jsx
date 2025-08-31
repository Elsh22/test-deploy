import React from 'react';

const ButtonClientComponent = () => {
  const handleButtonClick = () => {
    window.open('https://vcu.campusgroups.com/DMC/club_signup', '_blank');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <button className='px-12 py-6 text-4xl border' onClick={handleButtonClick}>
        Join RamsConnect
      </button>
    </div>
  );
};

export default ButtonClientComponent;
