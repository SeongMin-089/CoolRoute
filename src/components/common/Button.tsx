import { Link } from 'react-router-dom'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'outline'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  arrow?: boolean
  to?: string
  className?: string
  children: ReactNode
}

function Button({
  variant = 'primary',
  arrow = false,
  to,
  className = '',
  children,
  type = 'button',
  ...props
}: ButtonProps) {
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
      <Link to={to} className={buttonClassName}>
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
