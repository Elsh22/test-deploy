import React from 'react';

const ButtonClientComponent = () => {
  const handleButtonClick = () => {
    window.open('https://vcu.campusgroups.com/DMC/club_signup', '_blank');
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleButtonClick}
        className="px-12 py-6 text-4xl font-bold text-yellow-400 bg-white rounded-lg border-none
                   hover:bg-yellow-400 hover:text-white transition-colors duration-300"
      >
        Join RamsConnect
      </button>
    </div>
  );
};

export default ButtonClientComponent;
