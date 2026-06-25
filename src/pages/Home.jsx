import PageHero from '../components/common/PageHero'
import SectionBlock from '../components/common/SectionBlock'

function Home() {
  return (
    <div className="page page--home">
      <PageHero title="CoolRoute" />
      <SectionBlock id="home-placeholder" title="Home section" />
    </div>
  )
}

export default Home
