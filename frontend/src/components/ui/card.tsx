// src/components/ui/card.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="border rounded shadow-md p-4">
      {children}
    </div>
  );
};

export const CardContent: React.FC<CardProps> = ({ children }) => {
  return <div>{children}</div>;
};
