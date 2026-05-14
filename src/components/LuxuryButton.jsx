import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LuxuryButton({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  type = 'button',
  className = '',
  disabled = false,
}) {
  const variantClass = {
    primary: 'btn-luxury btn-luxury-primary',
    outline: 'btn-luxury btn-luxury-outline',
    ghost: 'btn-luxury btn-luxury-ghost',
  }[variant];

  const classes = `${variantClass} ${className}`;

  const inner = (
    <motion.span
      whileHover={{ letterSpacing: '0.22em' }}
      transition={{ duration: 0.3 }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {inner}
    </button>
  );
}