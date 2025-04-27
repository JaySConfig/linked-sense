// components/Button.jsx
import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

// Base styles and variant/size definitions using DaisyUI classes
const baseStyles = 'inline-flex items-center justify-center rounded-md border border-transparent font-medium transition disabled:opacity-50 disabled:cursor-not-allowed';

// Use DaisyUI theme variables instead of hardcoded colors
const variants = {
    primary: 'bg-primary text-primary-content hover:bg-primary-focus border-primary',
    secondary: 'bg-secondary text-secondary-content hover:bg-secondary-focus border-secondary',
    accent: 'bg-accent text-accent-content hover:bg-accent-focus border-accent',
    info: 'bg-info text-info-content hover:bg-info-focus border-info',
    success: 'bg-success text-success-content hover:bg-success-focus border-success',
    warning: 'bg-warning text-warning-content hover:bg-warning-focus border-warning',
    error: 'bg-error text-error-content hover:bg-error-focus border-error',
    ghost: 'bg-transparent text-base-content hover:bg-base-200 border-none shadow-none',
    outline: 'bg-transparent border border-base-300 text-base-content hover:bg-base-200',
};

// Size classes
const sizes = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
};

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  href,
  ...props
}) => {
  const combinedClassName = clsx(
    baseStyles,
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    className
  );

  // If an href is provided, render a Next.js Link
  if (href) {
    return (
      <Link 
        href={href}
        className={combinedClassName}
        {...props}
      >
        {children}
      </Link>
    );
  }

  // Otherwise, render a button element
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;