import { Link } from 'react-router-dom'

interface PageHeroProps {
  eyebrow?: string
  title: string
  description?: string
  image?: string
  backgroundImage?: string
}

function PageHero({ title, description, image, backgroundImage }: PageHeroProps) {
  const heroImage = image ?? backgroundImage

  return (
    <section className={`page-hero${heroImage ? ' page-hero--image' : ''}`}>
      {heroImage && (
        <img
          className="page-hero__image"
          src={heroImage}
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
