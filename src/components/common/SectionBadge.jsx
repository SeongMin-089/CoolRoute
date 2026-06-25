function SectionBadge({
  variant = 'default',
  dot = true,
  className = '',
  children,
}) {
  const badgeClassName = [
    'section-badge',
    `section-badge--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={badgeClassName}>
      {dot && <span className="section-badge__dot" />}
      <span>{children}</span>
    </span>
  )
}

export default SectionBadge
