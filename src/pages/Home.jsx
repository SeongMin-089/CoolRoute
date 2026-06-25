import Button from "../components/common/Button"
import PageHero from "../components/common/PageHero"
import SectionBadge from "../components/common/SectionBadge"
import SectionBlock from "../components/common/SectionBlock"

function Home() {
  return (
    <div className="page page--home">
      <PageHero title="CoolRoute" />
      <SectionBlock id="home-placeholder" title="Home section">
        {/* <div className="home-ui-preview">
          <div className="home-ui-preview__badges">
            <SectionBadge>전국 6개 거점</SectionBadge>
            <SectionBadge variant="glass">
              편의점 콜드체인 물류 전문기업
            </SectionBadge>
          </div>
          <div className="home-ui-preview__actions">
            <Button to="/business" arrow>
              운영 네트워크 보기
            </Button>
            <Button to="/support" variant="outline">
              도입 상담 요청
            </Button>
          </div>
        </div> */}
      </SectionBlock>
    </div>
  )
}

export default Home
