import { Link } from 'react-router-dom'
import type { CSSProperties } from 'react'

interface PageHeroProps {
  title: string
  description?: string
  image?: string
}

function PageHero({ title, description, image }: PageHeroProps) {
  return (
    <section className={`page-hero${image ? ' page-hero--image' : ''}`}>
      {image && (
        <img
          className="page-hero__image"
          src={image}
          alt=""
          aria-hidden="true"
        />
      )}

      <div className="page-hero__inner">
        <nav className="page-hero__breadcrumb" aria-label="Breadcrumb">
          <Link to="/">홈</Link>
          <span aria-hidden="true">›</span>
          <strong>{title}</strong>
        </nav>

        <h1>{title}</h1>

        {description && <p>{description}</p>}
      </div>
    </section>
  );
}

export default PageHero;
