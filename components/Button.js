// components/Button.jsx
import React from 'react';
import clsx from 'clsx';
import Link from 'next/link'; // Import Next.js Link

// Base styles and variant/size definitions (keep these as they were)
const baseStyles = 'inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed';
const variants = { /* ... your variants ... */
    primary: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500',
    secondary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    info: 'bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-indigo-500 border-none shadow-none',
    outline: 'bg-transparent border border-slate-300 text-slate-700 hover:bg-slate-50 focus:ring-indigo-500',
};
const sizes = { /* ... your sizes ... */
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
  href, // <-- Add href prop
  ...props
}) => {

  const combinedClassName = clsx(
    baseStyles,
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    className
  );

  // --- Conditional Rendering ---
  // If an href is provided, render a Next.js Link wrapping an anchor tag
  if (href) {
    return (
      <Link href={href} legacyBehavior passHref>
        <a
          className={combinedClassName}
          {...props} // Spread other props like target, rel, etc. onto the anchor
        >
          {children}
        </a>
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
      {...props} // Spread remaining props onto the button element
    >
      {children}
    </button>
  );
};

export default Button;