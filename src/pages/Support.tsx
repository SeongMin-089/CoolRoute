import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageHero from "../components/common/PageHero";
import SectionBlock from "../components/common/SectionBlock";
import { scrollToHashElement } from "../components/common/hashScroll";

import { subNavItems } from "../data/subNavData";

type SupportSectionId = "notice" | "faq" | "guide" | "contact";

interface SupportTab {
  label: string;
  id: SupportSectionId;
}

const supportTabs = subNavItems.support as SupportTab[];
const supportTabIds = supportTabs.map((tab) => tab.id);

const isSupportSectionId = (id: string): id is SupportSectionId =>
  supportTabIds.includes(id as SupportSectionId);

const supportTabIcons: Record<SupportSectionId, string> = {
  notice: "⌂",
  faq: "?",
  guide: "□",
  contact: "✉",
};

const sectionMeta: Record<SupportSectionId, { title: string; badge: string }> =
  {
    notice: {
      title: "공지사항",
      badge: "Notice",
    },
    faq: {
      title: "자주 묻는 질문",
      badge: "FAQ",
    },
    guide: {
      title: "이용안내",
      badge: "Guide",
    },
    contact: {
      title: "문의안내",
      badge: "Contact",
    },
  };

const noticeList = [
  {
    type: "공지",
    title: "콜드체인 통합 관리 시스템 정기 점검 안내",
    date: "2026.06.18",
  },
  {
    type: "안내",
    title: "온도 모니터링 경고 기준 업데이트 안내",
    date: "2026.06.10",
  },
  {
    type: "안내",
    title: "배송기사용 시스템 배송 경로 기능 개선",
    date: "2026.05.29",
  },
  {
    type: "보도",
    title: "CoolRoute, 영남 냉동 거점 증설로 처리량 30% 확대",
    date: "2026.05.14",
  },
  {
    type: "보도",
    title: "온도 준수율 99.8% 달성 · 콜드체인 표준 운영 발표",
    date: "2026.04.22",
  },
];

const faqList = [
  {
    number: "01",
    question: "시스템은 어떻게 이용하나요?",
    answer:
      "상단 로그인에서 역할을 선택한 뒤 권한에 맞는 대시보드로 이동하여 이용할 수 있습니다.",
  },
  {
    number: "02",
    question: "배송 상태는 어디서 확인하나요?",
    answer:
      "점주 또는 물류센터 권한으로 로그인한 뒤 배송 현황 메뉴에서 상태를 확인할 수 있습니다.",
  },
  {
    number: "03",
    question: "공지사항은 어디서 확인하나요?",
    answer:
      "고객지원 페이지의 공지사항 탭에서 최신 안내와 점검 일정을 확인할 수 있습니다.",
  },
  {
    number: "04",
    question: "온도 이상 알림은 어떻게 확인하나요?",
    answer:
      "온도 모니터링 화면에서 차량별 온도 기록과 이상 발생 시간을 확인할 수 있습니다.",
  },
];

const guideSteps = [
  {
    number: "01",
    title: "역할 선택",
    desc: "점주 · 배송기사 · 물류센터 중 본인 역할을 고릅니다.",
    label: "로그인",
  },
  {
    number: "02",
    title: "계정 로그인",
    desc: "발급받은 계정으로 로그인하면 권한에 맞는 화면만 열립니다.",
    label: "인증",
  },
  {
    number: "03",
    title: "대시보드 이용",
    desc: "발주·배송·재고·온도 상태를 확인하고 업무를 처리합니다.",
    label: "이용",
  },
];

const roleGuides = [
  {
    role: "점주",
    title: "발주 · 배송 확인",
    desc: "상품 발주, 배송 상태, 폐기 임박 상품을 확인합니다.",
  },
  {
    role: "배송기사",
    title: "배송 처리",
    desc: "금일 배송 목록 확인, 완료·미배송 처리를 합니다.",
  },
  {
    role: "물류센터",
    title: "재고 · 입출고",
    desc: "재고·발주 처리와 입고·출고 내역을 관리합니다.",
  },
];

function Support() {
  const { hash } = useLocation();
  const [activeSection, setActiveSection] =
    useState<SupportSectionId>("notice");

  const activeMeta = sectionMeta[activeSection];

  useEffect(() => {
    const hashId = hash.replace("#", "");

    if (isSupportSectionId(hashId)) {
      setActiveSection(hashId);
    }
  }, [hash]);

  useEffect(() => {
    const hashId = hash.replace("#", "");

    if (!isSupportSectionId(hashId) || hashId !== activeSection) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      window.setTimeout(() => {
        scrollToHashElement(hashId);
      }, 40);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [activeSection, hash]);

  const renderSectionContent = () => {
    switch (activeSection) {
      case "notice":
        return (
          <SectionBlock id="notice" title="공지사항">
            <div className="support-notice-list">
              {noticeList.map((notice) => (
                <article className="support-notice-item" key={notice.title}>
                  <span
                    className={`support-notice-item__type support-notice-item__type--${notice.type}`}
                  >
                    {notice.type}
                  </span>
                  <h3>{notice.title}</h3>
                  <time>{notice.date}</time>
                </article>
              ))}
            </div>
          </SectionBlock>
        );

      case "faq":
        return (
          <SectionBlock id="faq" title="자주 묻는 질문">
            <div className="support-faq-list">
              {faqList.map((faq) => (
                <details className="support-faq-item" key={faq.question}>
                  <summary>
                    <span>{faq.number}</span>
                    <strong>{faq.question}</strong>
                    <em>+</em>
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </SectionBlock>
        );

      case "guide":
        return (
          <SectionBlock id="guide" title="이용안내">
            <p className="support-section-desc">
              상단 로그인에서 역할을 선택하면 권한에 맞는 대시보드로 이동합니다.
              처음 이용 시 아래 절차를 따라 주세요.
            </p>

            <div className="support-guide-steps">
              {guideSteps.map((step) => (
                <article className="support-guide-step" key={step.number}>
                  <span>{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                  <strong>{step.label}</strong>
                </article>
              ))}
            </div>

            <div className="support-role-grid">
              {roleGuides.map((guide) => (
                <article className="support-role-card" key={guide.role}>
                  <span>{guide.role}</span>
                  <h3>{guide.title}</h3>
                  <p>{guide.desc}</p>
                </article>
              ))}
            </div>
          </SectionBlock>
        );

      case "contact":
        return (
          <SectionBlock id="contact" title="문의안내">
            <div className="support-contact-grid">
              <article className="support-contact-card">
                <div className="support-contact-row">
                  <span>○</span>
                  <div>
                    <h3>문의 시간</h3>
                    <strong>평일 09:00 ~ 18:00</strong>
                    <p>주말 · 공휴일 휴무</p>
                  </div>
                </div>

                <div className="support-contact-row">
                  <span>☰</span>
                  <div>
                    <h3>문의 유형</h3>
                    <strong>시스템 · 물류 데이터 · 온도 관리</strong>
                    <p>역할별 화면 이용 문의 포함</p>
                  </div>
                </div>

                <div className="support-contact-row">
                  <span>✉</span>
                  <div>
                    <h3>이메일</h3>
                    <strong>support@coolroute.co.kr</strong>
                    <p>24시간 접수 · 순차 답변</p>
                  </div>
                </div>

                <button type="button">문의 메일 보내기</button>
              </article>

              <article className="support-contact-card">
                <div className="support-contact-row">
                  <span>☎</span>
                  <div>
                    <h3>전화 문의</h3>
                    <strong>1666-0000</strong>
                    <p>평일 09:00 ~ 18:00 · 도입 상담 포함</p>
                  </div>
                </div>

                <div className="support-contact-row">
                  <span>◇</span>
                  <div>
                    <h3>카카오톡 채널</h3>
                    <strong>@CoolRoute</strong>
                    <p>실시간 상담 · 평일 응대</p>
                  </div>
                </div>

                <div className="support-contact-row">
                  <span>◎</span>
                  <div>
                    <h3>긴급 온도 이상</h3>
                    <strong>24시간 관제 확인</strong>
                    <p>이탈 감지 시 즉시 대응</p>
                  </div>
                </div>

                <button type="button" className="support-contact-card__primary">
                  도입 상담 신청 →
                </button>
              </article>
            </div>
          </SectionBlock>
        );

      default:
        return null;
    }
  };

  return (
    <div className="page page--support">
      <PageHero
        eyebrow="홈 › 고객지원"
        title="고객지원"
        description="공지사항, 자주 묻는 질문, 문의 안내까지 CoolRoute 이용을 돕습니다."
        backgroundImage="/business-hero-bg.png"
      />

      <div className="support-tab-wrap">
        <div className="support-tabs" role="tablist" aria-label="고객지원 메뉴">
          {supportTabs.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`support-tab ${isActive ? "is-active" : ""}`}
                key={item.id}
                onClick={() => setActiveSection(item.id)}
              >
                <span>{supportTabIcons[item.id]}</span>
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <main className="support-content">
        <section className="support-search-area">
          <div className="support-search-title">
            <span className="support-badge">• {activeMeta.badge}</span>
            <h2>궁금한 점이 있으신가요?</h2>
          </div>

          <label className="support-search">
            <input type="text" placeholder="궁금한 점을 입력하세요" />
            <span>⌕</span>
          </label>
        </section>

        <div className="support-active-section">{renderSectionContent()}</div>
      </main>
    </div>
  );
}

export default Support;
