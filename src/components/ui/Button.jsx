import AppLink from '../AppLink.jsx';

// variant: 'primary' | 'outline' | 'light'   size: undefined | 'sm'
export default function Button({ to, variant = 'primary', size, className = '', children, ...rest }) {
  const cls = ['btn', variant !== 'primary' && `btn--${variant}`, size && `btn--${size}`, className].filter(Boolean).join(' ');
  if (to) return <AppLink to={to} className={cls} {...rest}>{children}</AppLink>;
  return <button type="button" className={cls} {...rest}>{children}</button>;
}
