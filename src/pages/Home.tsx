import { useRef, useState } from "react"
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
    x: 42,
    y: 21,
  },
  {
    id: "gangwon",
    code: "강원",
    title: "강원 거점",
    description: "강원권 간선 연계 · 정온 중계",
    mapLabel: "강원",
    x: 51,
    y: 16,
  },
  {
    id: "chungcheong",
    code: "충청",
    title: "충청 크로스도크",
    description: "중부권 분기 · 긴급 배차",
    mapLabel: "충청",
    x: 46,
    y: 42,
  },
  {
    id: "yeongnam",
    code: "영남",
    title: "영남 냉동 거점",
    description: "냉동 간편식 · 아이스크림 보관",
    mapLabel: "영남",
    x: 63,
    y: 51,
  },
  {
    id: "honam",
    code: "호남",
    title: "호남 물류",
    description: "호남권 출고 · 권역 일괄 처리",
    mapLabel: "호남",
    x: 38,
    y: 63,
  },
  {
    id: "jeju",
    code: "제주",
    title: "제주 연계망",
    description: "도서 지역 출고 이력 일일 리포트",
    mapLabel: "제주",
    x: 34,
    y: 89,
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
    description:
      "서울·경기 주요 점포 냉장 순환과 야간 회차 배송을 담당합니다.",
    badge: "0~10도",
    code: "CUT-OFF 22:00",
  },
  {
    title: "충청 크로스도크",
    description:
      "중부권 간선 분기와 긴급 배차, 반품 회수 동선을 처리합니다.",
    badge: "상온 / 냉장",
    code: "RE-ROUTE 30M",
  },
  {
    title: "영남 냉동 거점",
    description:
      "냉동 간편식, 아이스크림, 저온 상품의 보관과 분리 운영을 맡습니다.",
    badge: "-18도",
    code: "TEMP LOG 24H",
  },
  {
    title: "호남·제주 연계망",
    description:
      "권역 일괄 물동과 도서 지역 출고 이력을 일일 리포트로 묶습니다.",
    badge: "면세권",
    code: "REPORT D+0",
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

      <section className="home-operation" aria-labelledby="home-operation-title">
        <div className="home-operation__inner">
          <div className="home-operation__content">
            <span className="home-operation__badge">
              <span className="home-operation__badge-dot" />
              도입 전 확인
            </span>

            <h2 id="home-operation-title">전국 콜드체인 운영 근거</h2>

            <p>{operationIntro}</p>

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
      </section>
    </div>
  )
}

export default Home
