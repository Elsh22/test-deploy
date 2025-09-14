import React from 'react';

const ButtonClientComponent = () => {
  const handleButtonClick = () => {
    window.open('https://vcu.campusgroups.com/DMC/club_signup', '_blank');
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleButtonClick}
        className="px-12 py-6 text-4xl bg-black text-yellow-500 font-bold rounded-lg border border-yellow-500 hover:bg-yellow-500 hover:text-white transition-colors"
      >
        Join RamsConnect
      </button>
    </div>
  );
};

export default ButtonClientComponent;
