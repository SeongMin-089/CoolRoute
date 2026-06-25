import { Link } from 'react-router-dom'

function Button({
  variant = 'primary',
  arrow = false,
  to,
  className = '',
  children,
  type = 'button',
  ...props
}) {
  const buttonClassName = ['button', `button--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      <span>{children}</span>
      {arrow && <span className="button__arrow">{'\u2192'}</span>}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={buttonClassName} {...props}>
        {content}
      </Link>
    )
  }

  return (
    <button type={type} className={buttonClassName} {...props}>
      {content}
    </button>
  )
}

export default Button
