import SectionTitle from './SectionTitle'

function SectionBlock({ id, title, children }) {
  return (
    <section id={id} className="section-block">
      <SectionTitle title={title} />
      <div className="section-block__content">
        {children || <p>Section placeholder text</p>}
      </div>
    </section>
  )
}

export default SectionBlock
