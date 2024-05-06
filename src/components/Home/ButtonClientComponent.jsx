import React from 'react';

const ButtonClientComponent = () => {
  const handleButtonClick = () => {
    window.open('https://vcu.campusgroups.com/DMC/club_signup', '_blank');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <button className='px-8 py-2 border' onClick={handleButtonClick}>
        Join RamsConnect
      </button>
    </div>
  );
};

export default ButtonClientComponent;
