import React from 'react';

const Button = () => {
  const handleClick = () => {
    window.location.href = '/scholarship';
  };

  return (
    <button className='px-8 py-2 border' onClick={handleClick}>
      DMC Scholarship
    </button>
  );
};

export default Button;
