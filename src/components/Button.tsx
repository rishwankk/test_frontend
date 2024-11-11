import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  label?: any;
}

const Button: React.FC<ButtonProps> = ({ onClick, className, label = 'Click Me' }) => {
  return (
    <button onClick={onClick} className={className}>
      {label}
    </button>
  );
};

export default Button;
