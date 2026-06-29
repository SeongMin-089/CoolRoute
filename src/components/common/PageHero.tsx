interface PageHeroProps {
  title: string
  description?: string
}

function PageHero({ title, description = 'Placeholder text' }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="page-hero__inner">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  )
}

export default PageHero
