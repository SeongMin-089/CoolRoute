import type { CSSProperties } from 'react'

interface PageHeroProps {
  title: string
  description?: string
  eyebrow?: string
  backgroundImage?: string
}

function PageHero({
  title,
  description,
  eyebrow,
  backgroundImage,
}: PageHeroProps) {
  const style = backgroundImage
    ? ({ '--page-hero-bg': `url(${backgroundImage})` } as CSSProperties)
    : undefined

  return (
    <section
      className={`page-hero${backgroundImage ? ' page-hero--image' : ''}`}
      style={style}
    >
      <div className="page-hero__inner">
        {eyebrow && <p className="page-hero__eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && (
          <p className="page-hero__description">{description}</p>
        )}
      </div>
    </section>
  );
}

export default PageHero;
