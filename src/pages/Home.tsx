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

function Home() {
  const [activeIndex, setActiveIndex] = useState(0)
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

  // useEffect(() => {
  //   const slideTimer = window.setInterval(() => {
  //     setActiveIndex((currentIndex) => (currentIndex + 1) % heroSlides.length)
  //   }, 15000)

  //   return () => {
  //     window.clearInterval(slideTimer)
  //   }
  // }, [])

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
    </div>
  )
}

export default Home
