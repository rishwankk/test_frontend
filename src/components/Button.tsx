import React from 'react';

interface ButtonProps {
  className?: string;
  label?: string | JSX.Element;
  onClick ?: () => void;
  disabled?: boolean; // Add this line
}


const Button: React.FC<ButtonProps> = ({ onClick, className, label = 'Click Me' }) => {
  return (
    <button onClick={onClick} className={className}>
      {label}
    </button>
  );
};

export default Button;
