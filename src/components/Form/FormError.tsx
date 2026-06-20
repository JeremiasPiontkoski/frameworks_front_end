import React from 'react';

interface FormErrorProps {
  message: string | null;
}

export const FormError: React.FC<FormErrorProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div 
      className="alert alert-danger py-2 text-center mb-3" 
      style={{ fontSize: '0.9rem' }}
      role="alert"
    >
      {message}
    </div>
  );
};