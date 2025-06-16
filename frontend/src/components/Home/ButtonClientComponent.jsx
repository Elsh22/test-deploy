import React from 'react';

const ButtonClientComponent = () => {
  const handleButtonClick = () => {
    window.open('https://vcu.campusgroups.com/DMC/club_signup', '_blank');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <button 
        className="btn-dmc-primary text-dmc-h4 px-dmc-lg py-dmc-sm hover:shadow-dmc-elegant transition-all duration-300"
        onClick={handleButtonClick}
      >
        Join RamsConnect
      </button>
    </div>
  );
};

export default ButtonClientComponent;
