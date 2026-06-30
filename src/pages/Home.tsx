import { useEffect, useState } from "react"
import Button from "../components/common/Button"

interface HeroSlide {
  id: string
  eyebrow: string
  title: string
  description: string
  image: string
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
      "출고에서 점포 입고까지, 전국 온도를 놓치지 않는 신선 물류를 운영합니다.",
    image: "/home-hero-01.png",
  },
  {
    id: "cold-storage",
    eyebrow: "콜드체인 물류 통합 관리",
    title: "온도를 지키는 물류,\n품질을 지키는 네트워크",
    description:
      "냉장·냉동 상품의 입고부터 보관, 배송까지 안정적으로 관리합니다.",
    image: "/home-hero-02.png",
  },
  {
    id: "store-delivery",
    eyebrow: "편의점 라스트마일 배송",
    title: "매일 아침 매장 앞까지\n신선함을 배송합니다",
    description:
      "도시 곳곳의 편의점에 필요한 상품을 정해진 시간과 온도로 전달합니다.",
    image: "/home-hero-03.png",
  },
]

const heroStats: HeroStat[] = [
  { value: "3,200+", label: "전국 일평균 출고" },
  { value: "99.8%", label: "정온 준수율" },
  { value: "6", label: "권역 거점 센터" },
  { value: "24h", label: "실시간 온도 관리" },
]

function Home() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const slideTimer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % heroSlides.length)
    }, 5000)

    return () => {
      window.clearInterval(slideTimer)
    }
  }, [])

  return (
    <div className="page page--home">
      <section className="home-hero" aria-label="CoolRoute main hero">
        <div className="home-hero__slides">
          {heroSlides.map((slide, index) => {
            const isActive = index === activeIndex

            return (
              <article
                key={slide.id}
                className={`home-hero__slide${isActive ? " is-active" : ""}`}
                aria-hidden={!isActive}
              >
                <img
                  className="home-hero__image"
                  src={slide.image}
                  alt=""
                  aria-hidden="true"
                />
                <div className="home-hero__overlay" />

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

        <div className="home-hero__controls" aria-label="Hero slide controls">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={`home-hero__indicator${
                index === activeIndex ? " is-active" : ""
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`${index + 1}번째 히어로 슬라이드 보기`}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
