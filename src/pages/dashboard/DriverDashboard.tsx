import "../../styles/pages/dashboard/DriverDashboard.scss";

type StatTone = "blue" | "green" | "orange" | "red";

interface DriverStat {
  title: string;
  value: number;
  unit: string;
  desc: string;
  tone: StatTone;
}

interface DeliveryStop {
  store: string;
  status: string;
  priority?: string;
  address: string;
  items: string[];
  actions: string[];
}

interface RecordRow {
  type: string;
  store: string;
  product: string;
  count: string;
  status: string;
}

const stats: DriverStat[] = [
  {
    title: "오늘 총 배송",
    value: 18,
    unit: "건",
    desc: "점포 12곳 방문",
    tone: "blue",
  },
  {
    title: "완료",
    value: 11,
    unit: "건",
    desc: "정상 입고 처리",
    tone: "green",
  },
  {
    title: "남은 배송",
    value: 6,
    unit: "건",
    desc: "냉장 2건 우선",
    tone: "orange",
  },
  {
    title: "미배송",
    value: 1,
    unit: "건",
    desc: "사유 등록 필요",
    tone: "red",
  },
];

const deliveryStops: DeliveryStop[] = [
  {
    store: "CU 강남역점",
    status: "배송중",
    priority: "냉장 우선",
    address: "서울 강남구 테헤란로 152 · 14:30 도착 예정",
    items: ["도시락 24개", "샌드위치 18개", "우유 12개"],
    actions: ["배송 완료", "미배송 사유"],
  },
  {
    store: "GS25 역삼센터점",
    status: "대기",
    address: "서울 강남구 논현로 508 · 15:10 도착 예정",
    items: ["컵얼음 40개", "생수 32개"],
    actions: ["배송 완료", "미배송 사유"],
  },
  {
    store: "세븐일레븐 선릉점",
    status: "완료",
    address: "서울 강남구 선릉로 428 · 13:45 완료",
    items: ["삼각김밥 36개", "커피 20개"],
    actions: ["완료 확인"],
  },
];

const records: RecordRow[] = [
  {
    type: "미배송",
    store: "CU 삼성로점",
    product: "냉동 간편식",
    count: "12개",
    status: "사유 필요",
  },
  {
    type: "회수",
    store: "GS25 역삼센터점",
    product: "유통기한 임박 상품",
    count: "8개",
    status: "회수 예정",
  },
  {
    type: "반품",
    store: "CU 강남역점",
    product: "파손 상품",
    count: "3개",
    status: "확인 대기",
  },
];

function DriverDashboard() {
  return (
    <div className="driver-dashboard">
      <aside className="driver-dashboard__sidebar">
        <div className="driver-dashboard__brand">
          <div className="driver-dashboard__brand-icon">C</div>
          <div>
            <strong>CoolRoute</strong>
            <span>Cold Chain System</span>
          </div>
        </div>

        <nav className="driver-dashboard__nav" aria-label="배송기사 메뉴">
          <button className="is-active" type="button">
            <span>▦</span>
            대시보드
          </button>
          <button type="button">
            <span>≡</span>
            배송 목록
          </button>
          <button type="button">
            <span>↺</span>
            반품 / 회수
          </button>
          <button type="button">
            <span>!</span>
            미배송 관리
          </button>
        </nav>

        <div className="driver-dashboard__point">
          <strong>오늘의 운행 포인트</strong>
          <p>
            오후 냉장 배송 2건이 우선입니다. 회수 상품은 마지막 점포에서
            확인하세요.
          </p>
        </div>
      </aside>

      <main className="driver-dashboard__main">
        <header className="driver-dashboard__topbar">
          <div>
            <strong>배송기사 관리 시스템</strong>
            <p>오늘 배송할 점포와 처리 상태를 한 화면에서 관리합니다.</p>
          </div>

          <div className="driver-dashboard__user">
            <span>배송기사(driver)</span>
            <button type="button">로그아웃</button>
          </div>
        </header>

        <div className="driver-dashboard__content">
          <section className="driver-dashboard__left">
            <section className="driver-card driver-hero">
              <h1>배송기사 대시보드</h1>
              <p>
                오늘 방문해야 할 점포, 배송 상품, 완료 여부를 확인하고 미배송
                사유와 반품 회수 항목을 기록하세요.
              </p>
            </section>

            <section className="driver-dashboard__stats">
              {stats.map((stat) => (
                <article
                  key={stat.title}
                  className={`driver-card driver-stat driver-stat--${stat.tone}`}
                >
                  <span>{stat.title}</span>
                  <strong>
                    {stat.value}
                    <em>{stat.unit}</em>
                  </strong>
                  <p>{stat.desc}</p>
                </article>
              ))}
            </section>

            <section className="driver-card driver-alert">
              <strong>오늘의 알림</strong>
              <p>
                강남역점 냉장 상품은 14:30 이전 도착이 필요합니다. 미배송 발생
                시 사유를 먼저 등록해주세요.
              </p>
            </section>

            <section className="driver-card driver-route">
              <div className="driver-section-title">
                <div>
                  <h2>오늘 배송 경로</h2>
                  <p>현재 운행 진행률과 다음 방문 점포를 확인합니다.</p>
                </div>
                <button type="button">경로 보기</button>
              </div>

              <div className="driver-route__map">
                <div className="driver-route__line" />
                <span className="driver-route__pin driver-route__pin--start">
                  출
                </span>
                <span className="driver-route__pin driver-route__pin--now">
                  7
                </span>
                <span className="driver-route__pin driver-route__pin--next">
                  8
                </span>
                <span className="driver-route__pin driver-route__pin--end">
                  도
                </span>

                <div className="driver-route__info">
                  <strong>서울 남부 물류센터 - 강남권 편의점</strong>
                  <p>총 12개 점포 · 예상 종료 18:20</p>
                </div>
              </div>

              <div className="driver-progress">
                <div className="driver-progress__text">
                  <strong>69%</strong>
                  <span>완료</span>
                </div>
                <div className="driver-progress__bar">
                  <span />
                </div>
                <p>다음 점포 CU 강남역점</p>
                <p>예상 도착 14:30</p>
                <p>남은 거리 8.4km</p>
              </div>
            </section>

            <section className="driver-card driver-list">
              <div className="driver-section-title">
                <div>
                  <h2>배송할 점포 목록</h2>
                  <p>점포별 주소, 상품 수량, 배송 처리 버튼을 확인합니다.</p>
                </div>
                <button type="button">전체 보기</button>
              </div>

              <div className="driver-list__items">
                {deliveryStops.map((stop) => (
                  <article key={stop.store} className="driver-stop">
                    <div className="driver-stop__head">
                      <h3>{stop.store}</h3>
                      <div>
                        <span className="driver-badge driver-badge--blue">
                          {stop.status}
                        </span>
                        {stop.priority && (
                          <span className="driver-badge driver-badge--orange">
                            {stop.priority}
                          </span>
                        )}
                      </div>
                    </div>

                    <p>{stop.address}</p>

                    <div className="driver-stop__items">
                      {stop.items.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>

                    <div className="driver-stop__actions">
                      {stop.actions.map((action) => (
                        <button key={action} type="button">
                          {action}
                        </button>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="driver-card driver-record">
              <div className="driver-section-title">
                <div>
                  <h2>미배송 / 반품 회수 기록</h2>
                  <p>
                    복잡한 입력폼 대신 대시보드에서는 필요한 기록만 확인합니다.
                  </p>
                </div>
                <button type="button">기록 관리</button>
              </div>

              <div className="driver-record__table">
                <table>
                  <thead>
                    <tr>
                      <th>구분</th>
                      <th>점포</th>
                      <th>상품</th>
                      <th>수량</th>
                      <th>상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record) => (
                      <tr key={`${record.type}-${record.store}`}>
                        <td>{record.type}</td>
                        <td>{record.store}</td>
                        <td>{record.product}</td>
                        <td>{record.count}</td>
                        <td>
                          <span>{record.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </section>

          <aside className="driver-dashboard__right">
            <section className="driver-card driver-profile">
              <div className="driver-profile__top">
                <div className="driver-profile__avatar">배</div>
                <div>
                  <strong>김배송 기사</strong>
                  <p>driver_01 · 냉장 2호차</p>
                </div>
              </div>

              <dl>
                <div>
                  <dt>운행 상태</dt>
                  <dd>배송중</dd>
                </div>
                <div>
                  <dt>담당 구역</dt>
                  <dd>강남 / 역삼</dd>
                </div>
                <div>
                  <dt>차량 온도</dt>
                  <dd>냉장 3.2℃</dd>
                </div>
                <div>
                  <dt>마지막 갱신</dt>
                  <dd>2026.07.02 13:20</dd>
                </div>
              </dl>
            </section>

            <section className="driver-card driver-side-card">
              <h2>다음 배송</h2>
              <p>가장 먼저 처리할 점포입니다.</p>

              <div className="driver-side-card__list">
                <div className="driver-mini-item">
                  <div>
                    <strong>CU 강남역점</strong>
                    <span>14:30 · 냉장 상품 54개</span>
                  </div>
                  <button type="button">진행</button>
                </div>

                <div className="driver-mini-item">
                  <div>
                    <strong>도착 전 확인</strong>
                    <span>입고 공간 확보 요청됨</span>
                  </div>
                  <button type="button">확인</button>
                </div>
              </div>
            </section>

            <section className="driver-card driver-side-card">
              <h2>회수 예정</h2>
              <p>반품 및 회수 상품입니다.</p>
              <div className="driver-side-card__list">
                <div className="driver-mini-item">
                  <div>
                    <strong>유통기한 임박 상품</strong>
                    <span>GS25 역삼센터점 · 8개</span>
                  </div>
                  <button type="button">회수</button>
                </div>

                <div className="driver-mini-item">
                  <div>
                    <strong>파손 상품</strong>
                    <span>CU 강남역점 · 3개</span>
                  </div>
                  <button type="button">반품</button>
                </div>
              </div>
            </section>

            <section className="driver-card driver-side-card">
              <h2>오늘 할 일</h2>
              <p>기사 우선 처리 항목입니다.</p>

              <div className="driver-side-card__list">
                <div className="driver-mini-item">
                  <div>
                    <strong>미배송 사유 등록</strong>
                    <span>CU 삼성로점 · 1건</span>
                  </div>
                  <button type="button">등록</button>
                </div>

                <div className="driver-mini-item">
                  <div>
                    <strong>냉장 온도 확인</strong>
                    <span>현재 3.2℃ 정상</span>
                  </div>
                  <button type="button">점검</button>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default DriverDashboard;
