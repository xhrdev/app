import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  size?: 'lg' | 'md' | 'sm';
  variant?: 'default' | 'primary' | 'secondary';
};

export function Button({
  children,
  className,
  onClick,
  size = 'md',
  variant = 'default',
}: ButtonProps) {
  const baseStyles = 'px-4 py-2 rounded transition-colors';
  const variantStyles = {
    default: 'bg-black text-white hover:bg-gray-900',
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
  };
  const sizeStyles = {
    lg: 'text-lg',
    md: 'text-md',
    sm: 'text-sm',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
