import type { ReactNode } from 'react'
import SectionTitle from './SectionTitle'

interface SectionBlockProps {
  id: string
  title: string
  children?: ReactNode
}

function SectionBlock({ id, title, children }: SectionBlockProps) {
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
