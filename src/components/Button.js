import styles from './Button.module.css';

export function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  type = 'button',
  disabled,
  fullWidth,
  className,
  ...props 
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
}