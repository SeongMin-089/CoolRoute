import SectionBadge from '../common/SectionBadge'

const highlights = [
  '흩어진 데이터를 한 화면으로 통합',
  '역할별 권한에 맞는 정보만 노출',
  '모든 처리 이력을 회차 단위로 기록',
  '발주부터 폐기까지 끊김 없는 흐름 관리',
]

const pipeline = ['발주', '배송', '재고', '입출고', '폐기']

function IntegratedSystem() {
  return (
    <section id="integrated" className="solution-section">
      <div className="solution-section__inner solution-split">
        <div className="solution-card">
          <ul className="solution-list">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="solution-pipe" aria-hidden="true">
            {pipeline.map((step) => (
              <span key={step}>{step}</span>
            ))}
          </div>
        </div>

        <div className="solution-copy">
          <SectionBadge>Integrated System</SectionBadge>

          <h2>통합 관리 시스템</h2>

          <p>
            흩어져 있던 편의점 물류 데이터를 하나의 시스템으로 모았습니다.
            발주·배송·재고·입출고·폐기 상태를 한 화면에서 확인하고, 편의점 물류
            흐름을 통합적으로 관리할 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  )
}

export default IntegratedSystem
