import "../styles/pages/_LogisticsInfo.scss"

const subNavItems = [
  { id: "temp", label: "상품을 나누는 온도" },
  { id: "cvs", label: "편의점 물류 관리" },
  { id: "quality", label: "상품 품질 관리" },
  { id: "point", label: "콜드 체인 관리 포인트" },
]

function LogisticsInfo() {
  return (
    <div className="logistics-info-page">
      {/* 1. Page Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <p className="hero-category">물류정보</p>
          <h1 className="hero-title">물류정보</h1>
          <p className="hero-desc">
            콜드체인의 센터와 관리의 흐름, 그리고
            <br />
            물류 정보 시스템을 안내합니다.
          </p>
        </div>
      </section>

      {/* 2. Sub Navigation */}
      <nav className="sub-nav-container">
        <div className="sub-nav-list">
          {subNavItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="sub-nav-item">
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="content-wrapper">
        {/* 3. 콜드체인이란? */}
        <section id="intro" className="intro-section">
          <div className="intro-box">
            <h2 className="intro-title">❄️ 콜드체인이란?</h2>
            <p className="intro-text">
              콜드체인(Cold Chain)이란 농수산물 등의 신선식품을 산지에서부터
              소비자에게 전달되는
              <br />
              모든 유통 과정을 통칭합니다.
              <br />
              신선도 및 품질이 유지될 수 있도록 철저한 온도관리가 필수적인
              배송시스템입니다.
            </p>
          </div>
        </section>

        {/* 4. 상품을 나누는 3가지 온도대 */}
        <section id="temp">
          <div className="section-header">
            <span className="step-badge">Step 1</span>
            <h2 className="section-title">상품을 나누는 3가지 온도대</h2>
          </div>
          <div className="temp-grid">
            <div className="temp-card">
              <span className="badge blue">냉동</span>
              <h3>영하 18℃~-20℃</h3>
              <p>
                아이스크림, 냉동식품 등 영하의 온도를 유지해야 하는 상품. 일상
                생활 필수 및 보관 식품을 신선도를 완벽하게 보존합니다.
              </p>
            </div>
            <div className="temp-card">
              <span className="badge green">냉장</span>
              <h3>0~10℃</h3>
              <p>
                우유, 냉장음료, 도시락 등 신선식품 보관. 유통기한이 짧은 상품의
                신선도를 실시간으로 관리합니다.
              </p>
            </div>
            <div className="temp-card">
              <span className="badge orange">상온</span>
              <h3>15~25℃</h3>
              <p>
                라면, 과자, 음료 및 통조림 등 실온 보관 상품. 외부 기온 변화에
                영향을 받지 않도록 쾌적한 상온 환경으로 관리합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 5. 편의점 물류 관리 */}
        <section id="cvs">
          <div className="section-header">
            <span className="step-badge2">Step 2</span>
            <h2 className="section-title2">편의점 물류 관리</h2>
          </div>

          {/* 🛠️ 시안의 부드러운 회색 프레임용 감싸는 div 추가 */}
          <div className="gray-banner-frame2">
            <img
              src="/storemanager.png"
              alt="편의점 물류"
              className="inner-fluid-img"
            />
          </div>

          <div className="process-steps">
            <div className="process-line"></div>
            {[
              { title: "상품 입고", desc: "도착한 상품을 확인합니다." },
              { title: "검수/분류", desc: "수량을 꼼꼼히 검수합니다." },
              { title: "분류 적재", desc: "구역별로 신속히 적재합니다." },
              { title: "배송 출발", desc: "매장을 향해 출발합니다." },
              { title: "매장 입고", desc: "점포에 상품을 입고합니다." },
              { title: "폐기 처리", desc: "매장 반품 시 회수 처리합니다." },
            ].map((step, idx) => (
              <div key={idx} className="step-item">
                <div className="step-icon">✓</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. 상품 품질 관리 */}
        <section id="quality">
          <div className="section-header">
            <span className="step-badge3">Step 3</span>
            <h2 className="section-title3">상품 품질 관리</h2>
            <p className="section-desc">
              산지 품질이 한 치의 훼손, 오염, 기온차이 없이 유지되도록
              관리합니다.
            </p>
          </div>

          {/* 🛠️ 6번 세션도 동일한 프레임 구조 적용 */}
          <div className="gray-banner-frame3">
            <img
              src="/product.png"
              alt="품질 관리"
              className="inner-fluid-img"
            />
          </div>

          <div className="quality-grid">
            <div className="quality-card">
              <div className="quality-icon icon-green">🌡️</div>
              <h3>적정 온도 유지</h3>
              <p>
                물류 창고에서 출고까지 전 과정 적정 온도를 유지하며, 상품 및
                특성에 맞춘 다시 한 번 철저한 수작업을 거쳐 배송합니다.
              </p>
            </div>
            <div className="quality-card">
              <div className="quality-icon icon-green">📅</div>
              <h3>유통기한/폐기 관리</h3>
              <p>
                시스템 기반의 철저한 선입선출과 유통기한 임박 상품 알림, 지정
                폐기 등을 통해 늘 완벽한 상품을 점포에 제공합니다.
              </p>
            </div>
            <div className="quality-card">
              <div className="quality-icon icon-gray">😊</div>
              <h3>고객 만족도 향상</h3>
              <p>
                실시간 온도 모니터링 체계와 신속한 불만 처리 시스템을 통해
                고객이 안심할 수 있는 고품질의 서비스를 구축합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 7. 콜드 체인 관리 포인트 */}
        <section id="point">
          <div className="section-header">
            <span className="step-badge">Step 4</span>
            <h2 className="section-title">콜드 체인 관리 포인트</h2>
            <p className="section-desc">
              이상 온도를 감지하는 실시간 센서 알람부터 신속한 조치, 대체
              차량까지 - 체계적인 품질 프로세스를 확인하세요.
            </p>
          </div>

          <div className="point-layout">
            {/* 🛠️ 좌측 지게차 전용 이미지 컨테이너 구조 */}
            <div className="point-image-area">
              <img src="/cold.png" alt="물류 창고" className="side-fluid-img" />
            </div>

            {/* 🛠️ 우측 2x2 카드 그리드 (point-card-body 래퍼 보정 완료) */}
            <div className="point-grid">
              <div className="point-card">
                <div className="point-card-header">
                  <h3>0~10℃</h3>
                  <span className="badge green">94%</span>
                </div>
                <div className="point-card-body">
                  <h4>냉장 상품 관리</h4>
                  <p>신선식품 및 유제품의 신선도를 유지하기 위한 핵심 구간</p>
                </div>
              </div>

              <div className="point-card">
                <div className="point-card-header">
                  <h3>&lt; -18℃</h3>
                  <span className="badge blue">99%</span>
                </div>
                <div className="point-card-body">
                  <h4>냉동 상품 관리</h4>
                  <p>완전 냉동 상태 유지를 통한 장기 보존 품질 확보</p>
                </div>
              </div>

              <div className="point-card">
                <div className="point-card-header">
                  <h3>실시간</h3>
                  <span className="badge purple">LIVE</span>
                </div>
                <div className="point-card-body">
                  <h4>온도 이상 알림</h4>
                  <p>설정 범위 이탈 시 관제 센터 및 기사에게 즉각 통보</p>
                </div>
              </div>

              <div className="point-card">
                <div className="point-card-header">
                  <h3>0~1</h3>
                  <span className="badge red">ALERT</span>
                </div>
                <div className="point-card-body">
                  <h4>배송 차량 관제</h4>
                  <p>운송 전 구간 GPS 기반 실시간 위치 및 도어 개폐 모니터링</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default LogisticsInfo
