import React from 'react';

interface HeaderProps {
  title?: string;
  description?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  title = "Join DMC Non-Profit Network",
  description = "Connect with professionals, share your expertise, and make a difference in our community. Join our network of leaders committed to fostering growth and success."
}) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {title}
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
};

export default Header;