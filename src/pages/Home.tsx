import { useRef, useState } from "react"
import type { CSSProperties } from "react"
import { Link } from "react-router-dom"
import Button from "../components/common/Button"

type HeroSlideAlign = "left" | "right"

interface HeroSlide {
  id: string
  eyebrow: string
  title: string
  description: string
  image: string
  align: HeroSlideAlign
}

interface HeroStat {
  value: string
  label: string
}

interface NetworkRegion {
  id: string
  code: string
  title: string
  description: string
  mapLabel: string
  x: number
  y: number
}

interface OperationStat {
  value: string
  label: string
}

interface OperationCard {
  title: string
  description: string
  badge: string
  code: string
}

interface CoreService {
  id: string
  title: string
  description: string
  image: string
  to: string
}

interface FlowStep {
  id: string
  step: string
  title: string
  description: string
  icon: string
}

interface EsgItem {
  id: string
  category: string
  title: string
  description: string
  value: string
  suffix?: string
  detail: string
}

interface SystemGuide {
  id: string
  title: string
  icon: string
  items: string[]
}

const heroSlides: HeroSlide[] = [
  {
    id: "main-road",
    eyebrow: "편의점 콜드체인 물류 전문기업",
    title: "정온을 지키며 달리는\n편의점 콜드체인 네트워크",
    description:
      "출고에서 점포 입고까지, 전 구간 온도를 잃지 않는 신선 물류를 운영합니다.",
    image: "/home-hero-01.png",
    align: "right",
  },
  {
    id: "cold-storage",
    eyebrow: "편의점 콜드체인 물류 전문기업",
    title: "온도를 지키는 물류,\n품질을 지키는 네트워크",
    description:
      "냉장·냉동 상품의 입고부터 보관, 분류, 배송까지 안정적으로 관리합니다.",
    image: "/home-hero-02.png",
    align: "left",
  },
  {
    id: "store-delivery",
    eyebrow: "편의점 콜드체인 물류 전문기업",
    title: "매일 아침 매장 앞까지\n신선함을 배송합니다",
    description:
      "도시 곳곳의 편의점에 필요한 상품을 정해진 시간과 온도로 전달합니다.",
    image: "/home-hero-03.png",
    align: "right",
  },
]

const heroStats: HeroStat[] = [
  { value: "3,200+", label: "전국 연결 점포" },
  { value: "99.8%", label: "정온 준수율 · 최근 12개월" },
  { value: "6", label: "권역 거점 센터" },
  { value: "24h", label: "실시간 온도 관제" },
]

const networkRegions: NetworkRegion[] = [
  {
    id: "capital",
    code: "수도",
    title: "수도권 메인 허브",
    description: "서울·경기 점포 순환 · 야간 회차",
    mapLabel: "수도권",
    x: 30.7,
    y: 22.2,
  },
  {
    id: "gangwon",
    code: "강원",
    title: "강원 거점",
    description: "강원권 간선 연계 · 정온 중계",
    mapLabel: "강원",
    x: 49.4,
    y: 16.9,
  },
  {
    id: "chungcheong",
    code: "충청",
    title: "충청 크로스도크",
    description: "중부권 분기 · 긴급 배차",
    mapLabel: "충청",
    x: 40.1,
    y: 44.5,
  },
  {
    id: "yeongnam",
    code: "영남",
    title: "영남 냉동 거점",
    description: "냉동 간편식 · 아이스크림 보관",
    mapLabel: "영남",
    x: 71.6,
    y: 54,
  },
  {
    id: "honam",
    code: "호남",
    title: "호남 물류",
    description: "호남권 출고 · 권역 일괄 처리",
    mapLabel: "호남",
    x: 25.3,
    y: 66.7,
  },
  {
    id: "jeju",
    code: "제주",
    title: "제주 연계망",
    description: "도서 지역 출고 이력 일일 리포트",
    mapLabel: "제주",
    x: 17.9,
    y: 94.2,
  },
]

const operationIntro =
  "도입 상담 전에 권역, 온도대, 마감 기준, 이상 대응 수준을 먼저 확인할 수 있도록 핵심 운영정보를 전면에 배치했습니다."

const operationStats: OperationStat[] = [
  {
    value: "6개",
    label: "권역 거점 센터",
  },
  {
    value: "15분",
    label: "온도 이탈 1차 확인",
  },
  {
    value: "3온도",
    label: "상온·냉장·냉동 분리",
  },
  {
    value: "D+0",
    label: "당일 회차 리포트",
  },
]

const operationCards: OperationCard[] = [
  {
    title: "수도권 메인 허브",
    description: "서울·경기 주요 점포 냉장 순환과 야간 회차 배송을 담당합니다.",
    badge: "0~10℃",
    code: "CUT-OFF 22:00",
  },
  {
    title: "충청 크로스도크",
    description: "중부권 간선 분기와 긴급 배차, 반품 회수 동선을 처리합니다.",
    badge: "상온 / 냉장",
    code: "RE-ROUTE 30M",
  },
  {
    title: "영남 냉동 거점",
    description:
      "냉동 간편식, 아이스크림, 저온 상품의 보관과 분리 운영을 맡습니다.",
    badge: "-18℃↓",
    code: "TEMP LOG 24H",
  },
  {
    title: "호남·제주 연계망",
    description:
      "권역 일괄 물동과 도서 지역 출고 이력을 일일 리포트로 묶습니다.",
    badge: "멀티존",
    code: "REPORT D+0",
  },
]

const coreServices: CoreService[] = [
  {
    id: "cold-chain",
    title: "콜드체인 물류",
    description: "냉장·냉동 상품을 전 구간 온도 이탈 없이 보관·출고합니다.",
    image: "/home-service-coldchain.png",
    to: "/business",
  },
  {
    id: "store-logistics",
    title: "편의점 물류",
    description: "점포 발주부터 입고 검수까지 배송 흐름을 관리합니다.",
    image: "/home-service-store.png",
    to: "/business",
  },
  {
    id: "operation-management",
    title: "물류 운영 관리",
    description: "재고·배송·장비 상태를 한 화면에서 통합 관리합니다.",
    image: "/home-service-operation.png",
    to: "/solution",
  },
]

const flowSteps: FlowStep[] = [
  {
    id: "order",
    step: "STEP 01",
    title: "점포 발주",
    description: "점주가 상품을 발주합니다.",
    icon: "/home-flow-order.svg",
  },
  {
    id: "approve",
    step: "STEP 02",
    title: "물류센터 승인",
    description: "센터가 주문을 승인합니다.",
    icon: "/home-flow-approve.svg",
  },
  {
    id: "outbound",
    step: "STEP 03",
    title: "출고",
    description: "적정 온도로 피킹·출고합니다.",
    icon: "/home-flow-outbound.svg",
  },
  {
    id: "delivery",
    step: "STEP 04",
    title: "배송",
    description: "온도 유지하며 운송합니다.",
    icon: "/home-flow-delivery.svg",
  },
  {
    id: "inbound",
    step: "STEP 05",
    title: "점포 입고",
    description: "검수 후 입고를 완료합니다.",
    icon: "/home-flow-inbound.svg",
  },
  {
    id: "disposal",
    step: "STEP 06",
    title: "폐기 관리",
    description: "임박 상품을 폐기 처리합니다.",
    icon: "/home-flow-disposal.svg",
  },
]

const esgItems: EsgItem[] = [
  {
    id: "environment",
    category: "ENVIRONMENT",
    title: "탄소 저감 운송",
    description: "배차 최적화와 운영 효율화로 운송 단계 탄소 배출을 줄입니다.",
    value: "18",
    suffix: "%",
    detail: "배차 최적화 CO₂↓",
  },
  {
    id: "social",
    category: "SOCIAL",
    title: "식품 폐기 절감",
    description: "유통기한 임박 상품을 선별·재배치해 폐기 손실을 낮춥니다.",
    value: "27",
    suffix: "%",
    detail: "폐기량 감축 · 연간",
  },
  {
    id: "governance",
    category: "GOVERNANCE",
    title: "투명한 온도 기록",
    description:
      "전 구간 온도 이력을 회차별 리포트로 보관해 투명하게 공개합니다.",
    value: "99.8",
    suffix: "%",
    detail: "온도 준수율 · 최근 12개월",
  },
]

const systemGuides: SystemGuide[] = [
  {
    id: "store",
    title: "점주",
    icon: "/home-flow-order.svg",
    items: ["상품 발주", "배송 상태 확인", "폐기 임박 상품 확인"],
  },
  {
    id: "driver",
    title: "배송기사",
    icon: "/home-flow-delivery.svg",
    items: ["금일 배송 목록 확인", "배송 완료", "미배송 처리"],
  },
  {
    id: "center",
    title: "물류센터",
    icon: "/home-flow-outbound.svg",
    items: ["재고", "발주 처리", "입고", "출고 내역 관리"],
  },
]

function Home() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeRegionId, setActiveRegionId] = useState(networkRegions[0].id)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartXRef = useRef<number | null>(null)
  const dragEndXRef = useRef<number | null>(null)

  const goToSlide = (nextIndex: number) => {
    setActiveIndex((nextIndex + heroSlides.length) % heroSlides.length)
  }

  const handleDragStart = (clientX: number) => {
    dragStartXRef.current = clientX
    dragEndXRef.current = clientX
    setIsDragging(true)
  }

  const handleDragMove = (clientX: number) => {
    if (dragStartXRef.current === null) return

    dragEndXRef.current = clientX
  }

  const handleDragEnd = () => {
    if (dragStartXRef.current === null || dragEndXRef.current === null) {
      setIsDragging(false)
      return
    }

    const distance = dragStartXRef.current - dragEndXRef.current
    const threshold = 60

    if (Math.abs(distance) > threshold) {
      if (distance > 0) {
        goToSlide(activeIndex + 1)
      } else {
        goToSlide(activeIndex - 1)
      }
    }

    dragStartXRef.current = null
    dragEndXRef.current = null
    setIsDragging(false)
  }

  return (
    <div className="page page--home">
      <section
        className={`home-hero${isDragging ? " is-dragging" : ""}`}
        aria-label="CoolRoute main hero"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId)
          handleDragStart(event.clientX)
        }}
        onPointerMove={(event) => handleDragMove(event.clientX)}
        onPointerUp={handleDragEnd}
        onPointerCancel={handleDragEnd}
      >
        <div className="home-hero__slides">
          {heroSlides.map((slide, index) => {
            const isActive = index === activeIndex

            return (
              <article
                key={slide.id}
                className={`home-hero__slide home-hero__slide--${
                  slide.align
                }${isActive ? " is-active" : ""}`}
                aria-hidden={!isActive}
              >
                <img
                  className="home-hero__image"
                  src={slide.image}
                  alt=""
                  aria-hidden="true"
                  draggable="false"
                />

                <div className="home-hero__inner">
                  <div className="home-hero__content">
                    <span className="home-hero__eyebrow">
                      <span className="home-hero__eyebrow-dot" />
                      {slide.eyebrow}
                    </span>

                    <h1>
                      {slide.title.split("\n").map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </h1>

                    <p>{slide.description}</p>

                    <div className="home-hero__actions">
                      <Button to="/business" arrow>
                        운영 네트워크 보기
                      </Button>
                      <Button to="/support" variant="outline">
                        도입 상담 요청
                      </Button>
                    </div>
                  </div>

                  <div
                    className="home-hero__stats"
                    aria-label="CoolRoute operation statistics"
                  >
                    {heroStats.map((stat) => (
                      <div className="home-hero__stat" key={stat.label}>
                        <strong>{stat.value}</strong>
                        <span>{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="home-network" aria-labelledby="home-network-title">
        <div className="home-network__inner">
          <div className="home-network__content">
            <span className="home-network__badge">
              <span className="home-network__badge-dot" />
              전국 6개 거점
            </span>

            <h2 id="home-network-title">전국 콜드체인 물류 네트워크</h2>

            <p>
              권역별 6개 정온 물류센터가 전국 점포망의 신선 배송을 책임집니다.
            </p>

            <div className="home-network__cards">
              {networkRegions.map((region) => {
                const isActive = activeRegionId === region.id

                return (
                  <button
                    key={region.id}
                    type="button"
                    className={`home-network__card${
                      isActive ? " is-active" : ""
                    }`}
                    onClick={() => setActiveRegionId(region.id)}
                    aria-pressed={isActive}
                  >
                    <span className="home-network__card-code">
                      {region.code}
                    </span>
                    <span className="home-network__card-text">
                      <strong>{region.title}</strong>
                      <span>{region.description}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="home-network__map-area">
            <div className="home-network__map">
              <img
                className="home-network__map-image"
                src="/network-map.svg"
                alt="전국 콜드체인 물류 네트워크 지도"
              />

              {networkRegions.map((region) => {
                const isActive = activeRegionId === region.id

                return (
                  <button
                    key={region.id}
                    type="button"
                    className={`home-network__pin${
                      isActive ? " is-active" : ""
                    }`}
                    style={{
                      left: `${region.x}%`,
                      top: `${region.y}%`,
                    }}
                    onClick={() => setActiveRegionId(region.id)}
                    aria-label={`${region.mapLabel} 거점 보기`}
                    aria-pressed={isActive}
                  >
                    <span className="home-network__pin-dot" />
                    <span className="home-network__pin-label">
                      {region.mapLabel}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section
        className="home-operation"
        aria-labelledby="home-operation-title"
      >
        <div className="home-operation__inner">
          <div className="home-operation__header">
            <span className="home-operation__badge">
              <span className="home-operation__badge-dot" />
              도입 전 확인
            </span>

            <h2 id="home-operation-title">전국 콜드체인 운영 근거</h2>
          </div>

          <div className="home-operation__body">
            <div className="home-operation__summary">
              <p>{operationIntro}</p>

              <div className="home-operation__stats">
                {operationStats.map((stat) => (
                  <div className="home-operation__stat" key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="home-operation__cards">
              {operationCards.map((card) => (
                <article className="home-operation__card" key={card.title}>
                  <div className="home-operation__card-head">
                    <h3>{card.title}</h3>
                    <span>{card.badge}</span>
                  </div>

                  <p>{card.description}</p>

                  <strong>{card.code}</strong>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="home-services" aria-labelledby="home-services-title">
        <div className="home-services__inner">
          <div className="home-services__heading">
            <span className="home-services__badge">
              <span className="home-services__badge-dot" />
              서비스 영역
            </span>

            <h2 id="home-services-title">핵심 서비스</h2>

            <p>CoolRoute가 제공하는 주요 물류 서비스입니다.</p>
          </div>

          <div className="home-services__grid">
            {coreServices.map((service) => (
              <article className="home-services__card" key={service.id}>
                <div className="home-services__image-wrap">
                  <img
                    className="home-services__image"
                    src={service.image}
                    alt=""
                    aria-hidden="true"
                  />
                </div>

                <div className="home-services__body">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>

                  <Link className="home-services__link" to={service.to}>
                    자세히 보기
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-flow" aria-labelledby="home-flow-title">
        <div className="home-flow__inner">
          <div className="home-flow__heading">
            <span className="home-flow__badge">
              <span className="home-flow__badge-dot" />
              발주부터 폐기까지
            </span>

            <h2 id="home-flow-title">물류 흐름</h2>

            <p>점포 발주부터 폐기 관리까지, 하나의 흐름으로 이어집니다.</p>
          </div>

          <ol className="home-flow__list">
            {flowSteps.map((item) => (
              <li className="home-flow__item" key={item.id}>
                <div className="home-flow__icon-wrap">
                  <img
                    className="home-flow__icon"
                    src={item.icon}
                    alt=""
                    aria-hidden="true"
                  />
                </div>

                <span className="home-flow__step">{item.step}</span>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="home-esg" aria-labelledby="home-esg-title">
        <div className="home-esg__inner">
          <div className="home-esg__heading">
            <span className="home-esg__badge">
              <span className="home-esg__badge-dot" />
              ESG 경영
            </span>

            <h2 id="home-esg-title">지속가능경영 (ESG)</h2>

            <p>
              콜드체인의 에너지·식품 폐기·안전 데이터를 관리해 환경과 사회적
              책임을 함께 실현합니다.
            </p>
          </div>

          <div className="home-esg__panel">
            {esgItems.map((item) => (
              <article className="home-esg__item" key={item.id}>
                <span className="home-esg__category">{item.category}</span>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

                <div className="home-esg__metric">
                  <strong>
                    {item.value}
                    {item.suffix && <span>{item.suffix}</span>}
                  </strong>
                  <small>{item.detail}</small>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-system" aria-labelledby="home-system-title">
        <div className="home-system__inner">
          <div className="home-system__content">
            <span className="home-system__badge">
              <span className="home-system__badge-dot" />
              역할별 시스템
            </span>

            <h2 id="home-system-title">시스템 이용 안내</h2>

            <p>역할에 맞는 물류 관리 시스템을 이용하세요.</p>

            <Button to="/login" arrow>
              로그인하기
            </Button>
          </div>

          <div className="home-system__cards">
            {systemGuides.map((guide) => (
              <article className="home-system__card" key={guide.id}>
                <div className="home-system__icon-wrap" aria-hidden="true">
                  <span
                    className="home-system__icon"
                    style={
                      { "--icon-url": `url(${guide.icon})` } as CSSProperties
                    }
                  />
                </div>

                <h3>{guide.title}</h3>

                <ul>
                  {guide.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-cta" aria-labelledby="home-cta-title">
        <div className="home-cta__inner">
          <h2 id="home-cta-title">
            편의점 콜드체인 물류,
            <br />
            CoolRoute와 시작하세요
          </h2>

          <p>
            센터 권역, 온도대, 배송 회차를 먼저 확인하고 우리 점포망에 맞는 도입
            범위를 상담해 보세요.
          </p>

          <div className="home-cta__actions">
            <Button to="/support" arrow>
              도입 상담 요청
            </Button>
            <Button to="/login" variant="outline">
              기존 고객 로그인
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
